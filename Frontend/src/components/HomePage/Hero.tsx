import { Link } from "react-router-dom";
import mainImage from "../../resources/mainImage.png";
import Button from "../reuse/Button";
import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="lg:h-screen w-screen bg-gradient-to-b from-tint-9 to-tint-8 pb-20 pt-16 lg:pt-24">
      <div className="grid gap-10 md:gap-0 lg:grid-cols-2 sm:grid-rows-2 lg:grid-rows-1 items-center max-w-7xl center-container-x px-8">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-start ">
          <h2 className="font-black capitilize text-7xl  text-shade-2 mb-10 tracking-tighter">
            Custom-dyed discs, crafted for champions.
          </h2>
          <p className="leading-10 mb-6 text-2xl w-10/12 mb-12">
            Elevate your frisbee golf game with our one-of-a-kind, hand-crafted,
            and meticulously hand-dyed discs, each offering a unique blend of
            style and performance on the course.
          </p>
          <div className="flex gap-6">
            <Link to={"/shop"}>
              <Button primary rounded shadow className="text-4xl px-10 py-2">
                Shop
              </Button>
            </Link>

            <Button secondary outline rounded className="text-2xl gap-2">
              <a className="size-full" href="#manufacturers">
                Learn More
              </a>
              <FaArrowDown />
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={mainImage}
            className="w-8/12  lg:w-10/12 rounded-lg shadow-custom-1"
            alt="a picture of many custom dyed discs."
          />
        </div>
      </div>
    </section>
  );
}
