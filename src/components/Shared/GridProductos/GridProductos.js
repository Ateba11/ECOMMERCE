import styles from "./GridProductos.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { fn } from "@/utils";
import { Label } from "@/components/Shared/Label";
import { Producto } from "@/api";
import { Icon, Image, Input } from "semantic-ui-react";
import { ENV } from "@/utils";
import { Separator } from "../Separator";


export function GridProductos(props) {
  const { productos } = props;

  return (
    <div className={styles.gridProductos}>
    {map(productos, (producto) => (
      <Link
        key={producto.id}
        href={`/${producto.attributes.slug}`}
        className={styles.producto}
      >
        <div>
        <img src={`${ENV.SERVER_HOST}${producto.attributes.cover.data.attributes.url }`} />
          {producto.attributes.discount > 0 && (
            <Label.Discount className={styles.discount}>
              {`-${producto.attributes.discount}%`}
            </Label.Discount>
          )}
        </div>

        <div>
          <span>{producto.attributes.title}</span>
          <span className={styles.price}>
          {fn.calcDiscountedPrice(
              producto.attributes.price,
              producto.attributes.discount
            )}
            €
          </span>
        </div>
      </Link>
    ))}
  </div>
);
}
