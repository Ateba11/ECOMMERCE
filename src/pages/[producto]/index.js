export { default } from "./producto";
import { Producto } from "@/api";   

export async function getServerSideProps(context) {
  const {
    params: { producto },
  } = context;

  const productoCtrl = new Producto();
  const response = await productoCtrl.getBySlug(producto)

  console.log(producto);
  return {
    props: {
      producto: response,
    },
  };
}
