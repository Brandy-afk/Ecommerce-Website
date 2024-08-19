import CardType from "./CardInterface";

export default function Card({
  card,
  className,
}: {
  card: CardType;
  className?: string;
}) {
  return (
    <div
      className={`w-10/12 sm:w-8/12 justify-self-center shadow-xl bg-white rounded-xl overflow-hidden md:hover:-translate-y-4 hover:transition-transform ${className}`}
    >
      <div className="w-full h-60 overflow-hidden">
        <img src={card.image} alt="Picture" className="mb-4 w-full" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 ">
          <card.icon className="text-4xl md:text-3xl text-shade-5" />
          <h3 className="font-bold text-4xl md:text-2xl">{card.heading}</h3>
        </div>

        <p className="leading-8 p-2 text-xl md:text-lg">{card.body}</p>
      </div>
      <div className="h-12 bg-tint-6 m-2 rounded-xl"></div>
    </div>
  );
}
