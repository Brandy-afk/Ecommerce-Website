interface BellowTextProps {
  heading: string;
  info: string[];
}

export default function BellowText({ heading, info }: BellowTextProps) {
  const createItems = () =>
    info.map((i, index) => (
      <li key={index} className="mb-3 md:mb-0">
        {i}
      </li>
    ));
  return (
    <div className="px-4 pb-4 pt-2 text-2xl md:text-lg">
      <h3 className="font-bold mb-2 md:mb-0">{heading}</h3>
      <ul className="list-disc pl-8 md:pl-5">{createItems()}</ul>
    </div>
  );
}
