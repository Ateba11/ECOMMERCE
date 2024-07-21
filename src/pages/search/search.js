import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridProductos,
  NoResult,
  Pagination,
  Separator,
} from "@/components/Shared";
import { prepareDataForValidation } from "formik";

export default function SearchPage(props) {
  const { productos, pagination, searchText } = props;
  const hasResult = size(productos) > 0;

  useEffect(() => {
    document.getElementById("search-productos").focus();
  }, []);

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />

          <h2>Buscando: {searchText}</h2>
          {hasResult ? (
            <>
              <GridProductos productos={productos} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult text="No se han encontrado resultados" />
          )}
          <Separator height={100}/>
        </Container>
      </BasicLayout>
    </>
  );
}
