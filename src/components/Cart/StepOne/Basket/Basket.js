import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import styles from "./Basket.module.scss";
import { ENV } from "@/utils";

export function Basket(props) {
  const { productos } = props;
  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

      <div className={styles.block}>
        {map(productos, (producto) => (
          <div key={producto.id} className={styles.product}>
            <Image src={`${ENV.SERVER_HOST}${producto.attributes.cover.data.attributes.url}`}/>
            <div>
              <div className={styles.info}>
                <div>
                  <p>{producto.attributes.title}</p>
                  <p>{producto.attributes.platform.data.attributes.title}</p>
                </div>

                <Icon
                  name="trash alternate outline"    
                  link
                  onClick={() => deleteItem(producto.id)}
                />
              </div>

              <div className={styles.quantity}>
                <Dropdown
                  className="number"
                  options={options}
                  selection
                  value={producto.quantity}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(producto.id, data.value)
                  }
                />
                <span>
                  {fn.calcDiscountedPrice(
                    producto.attributes.price,
                    producto.attributes.discount
                  )}
                  €
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

