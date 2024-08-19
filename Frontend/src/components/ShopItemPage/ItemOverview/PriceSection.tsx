interface PriceSectionProps {
  price: number;
}

export default function PriceSection({ price }: PriceSectionProps) {
  return (
    <div className="mb-4 flex flex-col items-start bg-gray-100 rounded-xl p-4 shadow-sm w-full md:w-8/12">
      {/* <span className="text-sm uppercase text-gray-600 mb-1">Low price</span> */}
      <div className="flex items-baseline justify-center md:justify-start w-full">
        <span className="text-3xl md:text-2xl text-neutral-500 mr-1">$</span>
        <span className="text-5xl md:text-5xl text-red-700 font-bold">
          {price}
        </span>
      </div>
    </div>
  );
}
