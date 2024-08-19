import AdminSection from "../../components/main/AdminSection";
import { useState } from "react";
import AdminOptions from "../../components/AdminPage/AdminOptions";
import ProductList from "../../components/AdminPage/ProductList";

export default function AdminPage() {
  const [listState, setListState] = useState(false);

  const applyListState = (state: boolean) => {
    return setListState(state);
  };

  const content = (
    <>
      <AdminOptions state={listState} onChange={applyListState} />
      {listState ? <div>OrderList</div> : <ProductList />}
    </>
  );

  return <AdminSection header="Admin Access">{content}</AdminSection>;
}
