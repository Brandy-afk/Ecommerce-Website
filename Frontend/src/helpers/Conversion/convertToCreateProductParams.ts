import { ProductFormInputs } from "../../pages/Admin/CreateProductPageFolder/InitialValues";
import { ClothingWithInventory } from "../../store/api/types/product/clothing";
import CreateProductParams from "../../store/api/types/product/createProductParams";
import Disc from "../../store/api/types/product/disc";

export default function convertToCreateProductParams(
  product: ProductFormInputs,
  imageId: string,
  disc?: Disc,
  clothing?: ClothingWithInventory
): CreateProductParams {
  // if (product.productType == "1" && disc) {
  //   disc.discType = disc.discType;
  //   disc.diameter = Number(disc.diameter);
  //   disc.thickness = Number(disc.thickness);
  //   disc.weight = Number(disc.weight);
  // } else if (product.productType == "2" && clothing) {
  //   clothing.clothingType = clothing.clothingType;

  //   clothing.inventories.forEach((ele) => {
  //     ele.size = parseInt(ele.size as string);
  //   });
  // }

  return {
    name: product.name,
    imageId: imageId,
    trackingId: product.trackingId,
    description: product.description,
    price: product.price,
    colors: product.colors.split(","),
    manufacturer: product.manufacturer,
    productType: product.productType,
    active: product.active,
    stock: Number(product.stock),
    disc: product.productType === 1 ? disc : undefined,
    clothing: product.productType === 2 ? clothing : undefined,
  };
}
