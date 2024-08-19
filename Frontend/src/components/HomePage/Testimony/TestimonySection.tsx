import Section from "../../main/Section";
import AuthorImage from "../../../resources/portraits/person2.jpg";
import TestimonyItem from "./TestimonyItem";

export interface Testimony {
  body: string;
  customer: string;
  authorImage: string;
}

const testimonies: Testimony[] = [
  {
    body: "I couldn't be happier with my custom dyed disc! The attention to detail and craftsmanship is outstanding. It's become my go-to disc on the course.",
    customer: "Michael Thompson",
    authorImage: AuthorImage,
  },
  {
    body: "The custom dyed disc I received exceeded my expectations. The colors are so vibrant, and the design is one-of-a-kind. It's a true work of art!",
    customer: "Emily Davis",
    authorImage: AuthorImage,
  },
  {
    body: "I've received so many compliments on my custom dyed disc. It not only looks amazing but also performs exceptionally well on the course.",
    customer: "Daniel Wilson",
    authorImage: AuthorImage,
  },
  {
    body: "Absolutely love my new custom dyed disc! The colors are vibrant, and the design is stunning. It flies like a dream!",
    customer: "Sarah Johnson",
    authorImage: AuthorImage,
  },
];

export default function TestimonySection() {
  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 md:gap-8">
      {testimonies.map((testimony, i) => (
        <TestimonyItem testimony={testimony} key={i} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col">
      <Section
        heading="Happy Discs!"
        subheading="testimonials"
        container={content}
        isBackground={false}
      />
    </div>
  );
}
