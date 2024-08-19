import DiscDropSection from "../discs/DiscDropSection";
import Image from "../../reuse/Image";
import AddToCartButton from "../../reuse/AddToCartButton";
import { ManufacturerEnum } from "../../../enums/ProductEnums";
import { OverviewChildProps } from "./ItemOverview";
import NameSection from "./NameSection";
import PriceSection from "./PriceSection";
import { DiscTypeEnum } from "../../../enums/DiscEnums";
import { addSpacesToCamelCase } from "../../../helpers/stringManipulation";
import Warning from "../../reuse/Warning";

export default function DiscOverview({ item }: OverviewChildProps) {
  return (
    <div className="md:grid-cols-2 lg:grid-cols-1/2 grid pb-20 min-h-[60vh] mx-4 md:mx-0">
      <div className="flex flex-col items-center mb-8 md:mb-0">
        <Image
          src={item?.image.filePath ?? ""}
          alt="solo disc"
          classNames="w-10/12 relative mb-4"
        />
        <DiscDropSection item={item} />
        {item.disc?.custom && (
          <Warning
            classNames="justify-center"
            warning="Custom disc color will eventually fade."
          />
        )}
      </div>

      <div className="flex flex-col items-center md:items-start pt-8">
        <NameSection
          name={item?.name}
          manufacturer={ManufacturerEnum[item.manufacturer]}
          type={`🥏 ${addSpacesToCamelCase(
            DiscTypeEnum[item.disc?.discType ?? 0]
          )}`}
        />
        <PriceSection price={item?.price} />
        <AddToCartButton
          item={item}
          classNames="text-4xl md:text-2xl w-10/12 md:w-64 h-28 md:h-16 mb-4 flex justify-center"
        />
        <p className="text-2xl md:text-lg text-center md:text-start leading-relaxed text-shade-4 pr-2 flex-grow">
          {item?.description}
        </p>
      </div>
    </div>
  );
}
