import { useParams } from "react-router-dom";
import AdminSection from "../../components/main/AdminSection";
import { useFetchProductQuery } from "../../store/store";
import ProductUpdateForm from "../../components/UpdateProductPage/ProductUpdateForm";
import DiscUpdateForm from "../../components/UpdateProductPage/DiscUpdateForm";
import ImageUpdateForm from "../../components/UpdateProductPage/ImageUpdateForm";
import ClothingUpdateForm from "../../components/UpdateProductPage/ClothingUpdateForm";
import ErrorPage from "../ErrorPage";
import { Skeleton } from "../../components/reuse/Skeleton";
import InventoryUpdateForm from "../../components/UpdateProductPage/InventoryUpdateForm";
import ClothingInventoryUpdateForm from "../../components/UpdateProductPage/ClothingInventoryUpdateForm";
import {
  CSSFormContext,
  errorCSS,
  inputCSS,
} from "../../hooks/useFormCSSContext";
import { ClothingWithInventory } from "../../store/api/types/product/clothing";
import Disc from "../../store/api/types/product/disc";

export default function ProductOverviewPage() {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useFetchProductQuery(id ?? "");

  if (error) {
    return <ErrorPage error={error as string} />;
  }

  if (!data && !isLoading) return <ErrorPage error="Error loading object." />;

  return (
    <CSSFormContext.Provider
      value={{
        input: inputCSS,
        error: errorCSS,
      }}
    >
      <AdminSection header="Product Overview">
        {isLoading ? (
          <Skeleton className="h-[36rem]" />
        ) : (
          <>
            <ProductUpdateForm product={data} />
            <ImageUpdateForm
              image={data && data.image}
              productId={data.productId}
              refetch={refetch}
            />
            {(() => {
              switch (data.productType.toString()) {
                case "1":
                  return (
                    <>
                      <DiscUpdateForm
                        disc={data?.disc as Disc}
                        productId={data.productId}
                      />
                      <InventoryUpdateForm
                        inventory={data.stock}
                        productId={data.productId}
                      />
                    </>
                  );
                case "2":
                  return (
                    <>
                      <ClothingUpdateForm
                        clothing={data?.clothing as ClothingWithInventory}
                        productId={data.productId}
                      />
                      <ClothingInventoryUpdateForm
                        inventories={data?.clothing?.inventories ?? []}
                        productId={data.productId}
                      />
                    </>
                  );
                default:
                  return <div>Bad Product Type</div>;
              }
            })()}
          </>
        )}
      </AdminSection>
    </CSSFormContext.Provider>
  );
}
