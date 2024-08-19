export default function UniqueDiscSection({}) {
  return (
    <div className="mb-1 border-rainbow rounded-xl flex flex-col items-center p-2">
      <div className="flex text-4xl md:text-2xl justify-center items-center gap-1">
        <span className="">⭐</span>
        <p className="italic font-bold">UNIQUE</p>
        <span className="">⭐</span>
      </div>
      <p className="text-2xl md:text-lg text-center w-8/12">
        There is only one of this item on the store
      </p>
    </div>
  );
}
