import { useState, useEffect } from "react";
import { Producto } from "@/api";
import { GridProductos } from "@/components/Shared";

const productoCtrl = new Producto();


export function LatestProductos(props) {
    const {title, limit = 9, platformId = null} = props;
  const [productos, setProductos] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const response = await productoCtrl.getLatestPublished({
          limit,
          platformId,
        });
        setProductos(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!productos) return null;

  return (
    <div>
      <h2>{title}</h2>
      <GridProductos productos={productos}/>
    </div>
  );
}
