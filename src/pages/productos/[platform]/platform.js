import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridProductos,
  Separator,
  NoResult,
  Pagination,
} from "@/components/Shared";

export default function PlatformPage(props) {
  const { productos, platform, pagination } = props;
  const hasProducts = size(productos) > 0;
  return (
    <>
      <BasicLayout relative>
        <Container>
          <Separator heigth={50} />

          <h2>{platform.attributes.title}</h2>

          {hasProducts ? (
            <>
              <GridProductos productos={productos} />
              <Separator heigth={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La categoria ${platform.attributes.title} aun no tiene productos`}
            />
          )}
          <Separator heigth={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
