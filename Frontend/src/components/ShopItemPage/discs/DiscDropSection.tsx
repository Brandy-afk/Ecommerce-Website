import Product from "../../../store/api/types/product/product";
import Accordion, { AccordionItem } from "../ItemOverview/Accordion";
import BellowText from "../ItemOverview/BellowText";
import { accordionCSS } from "../ItemOverview/ItemOverview";
import { shippingInfo } from "../clothing/shippingInfoArray";
import UniqueDiscSection from "./UniqueDiscSection";

export default function DiscDropSection({
  item,
}: {
  item: Product | undefined;
}) {
  if (!item) return <div>Error</div>;

  const stringValues: string[] = [
    `Diameter - ${item.disc?.diameter} cm.`,
    `Thickness - ${item.disc?.thickness} cm.`,
    `Weight - ${item.disc?.weight} ounces.`,
  ];

  const customBellow: AccordionItem = {
    label: "Custom",
    content: <div>{item.disc?.custom && <UniqueDiscSection />}</div>,
  };

  const discBellow: AccordionItem = {
    label: "Details",
    content: <BellowText heading="Disc Info:" info={stringValues} />,
  };

  const shippingBellow: AccordionItem = {
    label: "Shipping",
    content: <BellowText heading="Shipping Details:" info={shippingInfo} />,
  };

  const items: AccordionItem[] = [discBellow, shippingBellow];
  if (item.disc?.custom) {
    items.push(customBellow);
  }

  return <Accordion items={items} containerCSS={accordionCSS} />;
}
