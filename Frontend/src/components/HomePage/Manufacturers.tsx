import DiscmaniaLogo from "../../resources/manufacturers/Discmania.png";
import craftLogo from "../../resources/manufacturers/discraft.png";
import innovaLogo from "../../resources/manufacturers/innova.png";
import longStarLogo from "../../resources/manufacturers/LongStarDisc.png";
import mvpLogo from "../../resources/manufacturers/Mvp.png";

export default function Manufacturers() {
  return (
    <div
      id="manufacturers"
      className="bg-shade-6 bg-gradient-to-br from-shade-5 to-shade-8"
    >
      <div className="grid sm:grid-cols-2 sm:grid-rows-3 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-5 justify-items-center items-center brightness-0 opacity-50 px-20 md:gap-8 sm:gap-2 xl:mr-20">
        <img
          src={DiscmaniaLogo}
          alt="Discmania Logo"
          className="w-8/12 xl:justify-self-end"
        />

        <img src={craftLogo} alt="Discraft Logo" className="w-full" />

        <img src={innovaLogo} alt="Innova Logo" className="w-full" />

        <img src={longStarLogo} alt="Long Star Disc Logo" className="w-full" />

        <img
          src={mvpLogo}
          alt="MVP Logo"
          className="w-6/12 lg:w-full justify-self-center col-span-2 lg:col-auto lg:mt-0 -mt-20"
        />
      </div>
    </div>
  );
}
