import styles from "./Panel.module.scss";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn, ENV } from "@/utils";
import { useCart } from "@/hooks";
import { useState } from "react";

export function Panel(props) {
  const { productoId, producto } = props;
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();

  const platform = producto.platform.data;
  const buyPrice = fn.calcDiscountedPrice(producto.price, producto.discount);

  const addCartWrapper = () => {
    setLoading(true);
    addCart(productoId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContiner}>
        <Image
          src={`${ENV.SERVER_HOST}${producto.cover.data.attributes.url}`}
        />
      </div>
      <div className={styles.actionsContainer}>
        <div>
          <h2>{producto.title}</h2>
          <div className={styles.moreInfo}>
            <span>
              <Image
                src={`${ENV.SERVER_HOST}${platform.attributes.icon.data.attributes.url}`}
              />
              {platform.attributes.title}
            </span>
            <span>
              <Icon name="check" />
              Disponible
            </span>
          </div>
          <div className={styles.price}>
            {producto.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  {producto.price}€
                </span>
                <span className={styles.discount}>-{producto.discount}%</span>
              </>
            )}
            <span className={styles.price}>{buyPrice}€</span>
          </div>
          <Button primary fluid onClick={addCartWrapper} loading={loading}>
            Comprar ahora
          </Button>
        </div>
      </div>
    </Container>
  );
}
