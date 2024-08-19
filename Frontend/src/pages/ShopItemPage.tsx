import { useParams } from "react-router-dom";
import Contact from "../components/reuse/Contact";
import ItemOverview from "../components/ShopItemPage/ItemOverview/ItemOverview";
import SimilarProducts from "../components/ShopItemPage/SimilarProducts";
import { useNavigate } from "react-router-dom";
import { useFetchProductQuery } from "../store/store";

export default function ShopItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isFetching, isLoading } = useFetchProductQuery(
    id ?? "",
    {
      skip: !id,
    }
  );

  if (error || !id) navigate("/shop");

  return (
    <main className="bg-gradient-to-r from-tint-8 via-white to-tint-8">
      <div className="max-w-7xl center-container-x pb-24 pt-32 flex gap-4">
        <div className="w-full">
          <ItemOverview item={data} isFetching={isFetching || isLoading} />
          <SimilarProducts item={data} isFetching={isFetching || isLoading} />
        </div>
      </div>
      <Contact />
    </main>
  );
}
