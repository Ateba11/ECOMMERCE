import { Platform, Producto} from "@/api";
import { assignWith } from "lodash";

export { default } from "./platform";

export async function getServerSideProps(context) {
  const { query, params } = context;
  const { page = 1 } = query;
  const { platform } = params;

  const platformCtrl = new Platform();
  const responsePlatform = await platformCtrl.getBySlug(platform);

  const productoCtrl  = new Producto();
  const responseProducto = await productoCtrl.getProductosByPlatformSlug(platform, page)

  return {
    props: {
      platform: responsePlatform,
      productos: responseProducto.data,
      pagination: responseProducto.meta.pagination,
    },
  };
}
