import { BasicLayout } from "@/layouts";
import { Home } from "@/components/Home";
import { Separator, BarTrust, BannerAd } from "@/components/Shared";
import { Container } from "semantic-ui-react";


const platformsId = {
  hamburguesas: 1,
  hotdog: 2,
  bebidas: 3,
  malteadas: 4,
  combos: 5,
  ensaladas: 6,
  helados: 7,
};

export default function HomePage() {

  return (
    <>
      <BasicLayout>
        <Home.BannerLastProductoPublished />
        <Separator height={100} />

        <Container>
          <Home.LatestProductos title="Nuevos productos" />
        </Container>
        <Separator height={100} />

        <BarTrust />

        <Separator height={100} />

        <Container>
          <Home.LatestProductos
            title="Nuevas Creaciones por temporada"
            limit={3}
            platformId={platformsId.hamburguesas}
          />
        </Container>
        <Separator height={100} />

        <BannerAd
          title="Pide ya tu domicilio"
          subtitle="¡Elige tu mejor opción!"
          btnTitle="Entrar ahora"
          btnLink="/account"
          image="/images/img01.jpg"
        />

        <Separator height={50} />

        <Container>
          <Home.LatestProductos
            title="Combos nuevos proximamente"
            limit={3}
            platformId={platformsId.combos}
          />
        </Container>
        <Separator height={100} />

      </BasicLayout>
    </>
  );
}
