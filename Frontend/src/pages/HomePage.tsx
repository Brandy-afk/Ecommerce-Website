import Hero from "../components/HomePage/Hero";
import Cards from "../components/HomePage/Cards/Cards";
import ShopInfo from "../components/HomePage/MainShopPeak/ShopInfo";
import TestimonySection from "../components/HomePage/Testimony/TestimonySection";
import Contact from "../components/reuse/Contact";
import Manufacturers from "../components/HomePage/Manufacturers";
import GallarySection from "../components/HomePage/Testimony/GallarySection";
import soloDisc1 from "../resources/frisby/frisby2.png";
import soloDisc2 from "../resources/frisby/frisby1.png";
import soloDisc3 from "../resources/frisby/frisby3.png";
import soloDisc4 from "../resources/frisby/frisby5.png";

export default function HomePage() {
  return (
    <main className="pt-20">
      <Hero />
      <Manufacturers />
      <ShopInfo />
      <Cards />
      <GallarySection images={[soloDisc1, soloDisc2, soloDisc3, soloDisc4]} />
      <TestimonySection />
      <GallarySection images={[soloDisc1, soloDisc2, soloDisc3, soloDisc4]} />
      <Contact />
    </main>
  );
}
