import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDeleteProductMutation } from "../../../store/store";

export const useProductModification = () => {
  const nav = useNavigate();
  const [deleteProduct, { data, error, isLoading }] =
    useDeleteProductMutation();
  // Memoize the handleEdit and handleDelete functions
  const handleEdit = useCallback((productId: string) => {
    // Implement your edit logic here
    nav(`/admin/product/${productId}`);
  }, []);

  const handleDelete = useCallback(async (productId: string) => {
    const result = await deleteProduct(productId).unwrap();
    return { result, error };
  }, []);

  return { handleDelete, handleEdit, isLoading };
};
