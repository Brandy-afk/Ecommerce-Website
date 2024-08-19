import Clothing from "../../../store/api/types/product/clothing";
import Accordion, { AccordionItem } from "../ItemOverview/Accordion";
import BellowText from "../ItemOverview/BellowText";
import { accordionCSS } from "../ItemOverview/ItemOverview";
import { shippingInfo } from "./shippingInfoArray";

interface MaterialsProps {
  clothing: Clothing | undefined;
}

export default function Materials({ clothing }: MaterialsProps) {
  if (!clothing) return <div>Error</div>;

  const fabricPercentages: (keyof Omit<Clothing, "clothingType">)[] = [
    "cotton",
    "polyester",
    "wool",
    "linen",
  ];

  const infoItems = fabricPercentages.map(
    (fabric) => `${clothing[fabric]}% ${fabric}.`
  );

  const content: AccordionItem = {
    label: "Details",
    content: <BellowText heading="Clothing Details:" info={infoItems} />,
  };

  const shippingContent: AccordionItem = {
    label: "Shipping",
    content: <BellowText heading="Shipping Details:" info={shippingInfo} />,
  };

  return (
    <Accordion items={[content, shippingContent]} containerCSS={accordionCSS} />
  );
}
