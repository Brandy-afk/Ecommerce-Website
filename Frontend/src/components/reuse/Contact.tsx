import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="w-screen overflow-hidden bg-shade-4">
      <div className="center-container-x max-w-7xl px-8 py-20 text-tint-9 contact-container">
        <h3 className="mb-10 text-7xl font-extrabold captitilize tracking-tight">
          Want to know more?
        </h3>
        <Link to="/contact">
          <Button
            primary
            rounded
            scale
            className="text-3xl h-20 md:h-max gap-2"
          >
            Contact Us
            <FaArrowRight />
          </Button>
        </Link>
      </div>
    </section>
  );
}
