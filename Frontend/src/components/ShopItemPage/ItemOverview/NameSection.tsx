interface NameSectionProps {
  name: string;
  manufacturer: string;
  type?: string;
}

export default function NameSection({
  name,
  manufacturer,
  type,
}: NameSectionProps) {
  return (
    <div className="pb-4 w-full md:w-8/12 mb-2 text-center md:text-start">
      <h2 className="text-6xl font-bold text-shade-4 tracking-tight mb-3">
        {name}
      </h2>
      <span className="text-3xl md:text-2xl text-shade-4">
        {manufacturer} {type && <span className="ml-2">| {type}</span>}
      </span>
    </div>
  );
}
