import { ReactNode, useState } from "react";
import Bellow from "./Bellow";

interface AccordionProps {
  items: AccordionItem[];
  containerCSS: string;
}

export interface AccordionItem {
  label: string;
  content: JSX.Element;
}

export default function Accordion({ items, containerCSS }: AccordionProps) {
  const [index, setIndex] = useState<number>(-1);

  const onInteraction = (i: number) => {
    setIndex(index === i ? -1 : i);
  };

  const bellows = items.map((element, i) => (
    <Bellow
      key={i}
      keyValue={i}
      label={element.label}
      content={element.content}
      onToggle={() => onInteraction(i)}
      state={i === index}
    />
  ));

  return <div className={`${containerCSS}`}>{bellows}</div>;
}
