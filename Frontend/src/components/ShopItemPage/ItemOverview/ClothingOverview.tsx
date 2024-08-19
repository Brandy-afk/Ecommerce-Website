import Product from "../../../store/api/types/product/product";
import DiscDropSection from "../discs/DiscDropSection";
import Image from "../../reuse/Image";
import { Skeleton } from "../../reuse/Skeleton";
import AddToCartButton from "../../reuse/AddToCartButton";
import { ManufacturerEnum } from "../../../enums/ProductEnums";
import { useMemo, useState } from "react";
import { ClothingTypeEnum, SizeEnum } from "../../../enums/ClothingEnums";
import { OverviewChildProps } from "./ItemOverview";
import ButtonOptions from "../../AdminPage/ButtonOptions";
import Warning from "../../reuse/Warning";
import PriceSection from "./PriceSection";
import NameSection from "./NameSection";
import Materials from "../clothing/Materials";
import Clothing from "../../../store/api/types/product/clothing";
import { addSpacesToCamelCase } from "../../../helpers/stringManipulation";

interface SizeType {
  size: number;
  inStock: boolean;
}

export default function ClothingOverview({ item }: OverviewChildProps) {
  const sortedSizes: SizeType[] = useMemo(() => {
    return item.clothing?.inventories
      ? [...item.clothing.inventories]
          .sort((a, b) => a.size - b.size)
          .map((i) => ({
            size: i.size,
            inStock: i.quantity > 0,
          }))
      : [];
  }, [item]);

  const [clothingSize, setClothingSize] = useState<SizeType | undefined>(
    sortedSizes.find((s) => s.inStock)
  );

  const setSize = (size: string, index: number) => {
    setClothingSize(sortedSizes[index]);
  };
  return (
    <div className="md:grid-cols-2 lg:grid-cols-1/2 grid pb-20 min-h-[60vh] mx-4 md:mx-0">
      <div className="flex flex-col items-center gap-6 mb-8 md:mb-0">
        <Image
          src={item?.image.filePath ?? ""}
          alt="solo disc"
          classNames="w-10/12"
        />

        <Materials clothing={item.clothing as Clothing} />
      </div>

      <div className="flex flex-col items-center md:items-start pt-8">
        <NameSection
          name={item?.name}
          manufacturer={ManufacturerEnum[item.manufacturer]}
          type={`👚${addSpacesToCamelCase(
            ClothingTypeEnum[item.clothing?.clothingType ?? 0]
          )}`}
        />

        <PriceSection price={item?.price} />
        <div className="mb-4 flex flex-col items-center md:items-start">
          <div className="mb-2 w-min">
            <ButtonOptions
              buttonStates={sortedSizes.map((s) => s.inStock)}
              textValues={sortedSizes.map((s) => SizeEnum[s.size])}
              setSelected={setSize}
              activeState={(clothingSize && SizeEnum[clothingSize?.size]) ?? ""}
            />
          </div>
          <Warning
            classNames="md:justify-start mb-2"
            warning="Based on market size standards."
          />
        </div>

        <AddToCartButton
          activeState={clothingSize && clothingSize.inStock}
          clothingSize={clothingSize?.size}
          item={item}
          classNames=" text-4xl md:text-2xl w-10/12 md:w-64 h-28 md:h-16 mb-4 flex justify-center"
        />

        <p className="text-2xl md:text-lg text-center md:text-start leading-relaxed pr-2 flex-grow">
          {item?.description}
        </p>
      </div>
    </div>
  );
}
