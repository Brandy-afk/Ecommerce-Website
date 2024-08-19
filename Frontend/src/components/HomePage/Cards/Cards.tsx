// Consists of a photo, heading, extra information
import Card from "./Card";
import CardType from "./CardInterface";
import usaImage from "../../../resources/usaFlag.jpg";
import handDyedImage from "../../../resources/handDyed.png";
import playImage from "../../../resources/playYourWay.png";
import { IoIosColorFill as paintIcon } from "react-icons/io";
import { IoIosFlag as flagIcon } from "react-icons/io";
import { IoHappy as personIcon } from "react-icons/io5";
import { Link } from "react-router-dom";

import Section from "../../main/Section";

export default function Cards() {
  const cards: CardType[] = [
    {
      heading: "Hand dyed.",
      body: "All discs are hand dyed and custom made. Even before our business it was our hobby to create beautiful discs!",
      image: handDyedImage,
      icon: paintIcon,
    },
    {
      heading: "USA.",
      body: "We are proud to create our product right here in the United States. All products are shipped from Colorado!",
      image: usaImage,
      icon: flagIcon,
    },
    {
      heading: "Play your way.",
      body: "Wether you are a professional or just enjoying a hobby, our discs are here to personilize your play.",
      image: playImage,
      icon: personIcon,
    },
  ];

  const renderedCards = cards.map((card, i) => (
    <Card
      key={card.heading}
      card={card}
      className={
        i === 2
          ? "md:col-span-2 md:w-6/12 justify-self-center lg:col-auto lg:w-full"
          : "md:w-full"
      }
    />
  ));
  const content = (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-12 gap-8 mb-12">
        {renderedCards}
      </div>
      <div className="text-center">
        <Link
          to="/about"
          className="border-b-2 border-shade-2 text-xl hover:opacity-50"
        >
          More about us &rarr;
        </Link>
      </div>
    </div>
  );

  return (
    <Section
      heading="What we bring to the table"
      subheading="OUR MISSION"
      container={content}
      isBackground={true}
    />
  );
}
