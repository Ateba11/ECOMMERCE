import styles from "./Resume.module.scss";
import { Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { forEach, map } from "lodash";
import { useAuth, useCart } from "@/hooks";
import { Cart } from "@/api";
import { fn } from "@/utils";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";

const cartCtrl = new Cart();

export function Resume(props) {
  const { productos, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    let totalTemp = 0;

    forEach(productos, (producto) => {
      const price = fn.calcDiscountedPrice(
        producto.attributes.price,
        producto.attributes.discount
      );
      totalTemp += price * producto.quantity;
    });

    setTotal(totalTemp.toFixed(2));
  }, [productos]);

  const onPay = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      console.error(result.error.message);
    } else {
      const response = await cartCtrl.paymentCart(
        result.token,
        productos,
        user.id,
        addressSelected
      );

      if (response.status === 200) {
        deleteAllItems();
        goToStepEnd();
      } else {
        console.error("Error al realizar el pago");
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  if (!total) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(productos, (producto) => (
            <div key={producto.id} className={styles.product}>
              <div>
                <p>{producto.attributes.title}</p>
                <span>
                  {producto.attributes.platform.data.attributes.title}
                </span>
              </div>
              <span>
                {producto.quantity > 0 && `${producto.quantity}x`}
                {fn.calcDiscountedPrice(
                  producto.attributes.price,
                  producto.attributes.discount
                )}
                €
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>{total}€</span>
        </div>
        <Button
          primary
          fluid
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}
