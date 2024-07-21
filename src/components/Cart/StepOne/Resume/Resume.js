import styles from "./Resume.module.scss";
import { useState, useEffect } from "react";
import Linkn from "next/link";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import { forEach } from "lodash";
import { fn } from "@/utils";
import Link from "next/link";

export function Resume(props) {
  const { productos } = props;
  const router = useRouter();
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0,
    };

    forEach(productos, (producto) => {
      const price = fn.calcDiscountedPrice(
        producto.attributes.price,
        producto.attributes.discount
      );

      totals = {
        original:
          totals.original + producto.attributes.price * producto.quantity,
        discount:
          totals.discount +
          (producto.attributes.price - price) * producto.quantity,
        price: totals.price + price * producto.quantity,
      };
    });

    setTotals(totals);
  }, [productos]);

  const goToStepTWO = () => {
    router.replace({ query: { ...router.query, step: 2 } });
  };

  if (!totals) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.prices}>
            <div>
                <span>Precio Oficial</span>
                <span>{totals.original.toFixed(2)}€</span>
            </div>
            <div>
                <span>Descuento</span>
                <span>{totals.discount.toFixed(2)}€</span>
            </div>
            <div>
                <span>Subtotal</span>
                <span>{totals.price.toFixed(2)}€</span>
            </div>
        </div>
        <Button primary fluid onClick={goToStepTWO}>
            Proceder con el pago
        </Button>

        <Link href="/">Continuar comprando</Link>
      </div>
    </div>
  );
}
