import { Testimony } from "./TestimonySection";

interface TestimonyItemProps {
  testimony: Testimony;
}

export default function TestimonyItem({ testimony }: TestimonyItemProps) {
  return (
    <figure className="size-full grid grid-cols-testimonyItem md:flex md:flex-col justify-between border-4 rounded-lg shadow-xl bg-tint-8 p-4">
      <div className="overflow-hidden rounded-full size-24 border-4">
        <img
          src={testimony.authorImage}
          alt="customer image"
          className="size-full"
        />
      </div>
      <div>
        <blockquote className="text-xl leading-8 mb-2">
          {testimony.body}
        </blockquote>
        <cite className="text-lg text-neutral-400">{testimony.customer}</cite>
      </div>
    </figure>
  );
}
