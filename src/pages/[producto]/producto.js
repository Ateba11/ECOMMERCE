import { BasicLayout } from "@/layouts";
import { Producto } from "@/components/Producto";
import { ENV } from "@/utils";
import { Separator } from "@/components/Shared";

export default function ProductoPage(props) {
  const { producto } = props;
  const wallpaper = producto.attributes.wallpaper;

  return (
    <>
      <BasicLayout>
        <Producto.HeaderWallpaper
          image={`${ENV.SERVER_HOST}${wallpaper.data.attributes.url}`}
        />
        <Producto.Panel
          productoId={producto.id}
          producto={producto.attributes}
        />
        <Separator height={50} />
        <Producto.Info producto={producto.attributes} />
        <Separator height={30} />
        <Producto.Media screenshots={producto.attributes.screenshots.data} />
        <Separator  height={30}/>
      </BasicLayout>
    </>
  );
}
