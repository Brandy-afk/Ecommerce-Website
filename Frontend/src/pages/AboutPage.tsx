import Contact from "../components/reuse/Contact";
import MediaSection from "../components/AboutPage/MediaSection";

import founderPhoto from "../resources/founderWife.jpg";
import whatWeDoImage from "../resources/frisby/frisby4.png";
import whoWeAreImage from "../resources/captionPhoto.png";

export default function AboutPage() {
  return (
    <main>
      <MediaSection
        heading="Nice to meet you"
        body="At Z-dyes, we're passionate about bringing vibrant colors and unique 
        designs to the world of disc golf. Founded by Zander Lynch, 
        a lifelong disc golf enthusiast, our business was born out of a deep love 
        for the sport and a desire to create custom, eye-catching discs that make 
        playing even more exciting."
        image={founderPhoto}
        classNames="mt-24 bg-gradient-to-r from-tint-9 to-tint-6"
        leftBased={true}
        roundedImage
      />
      <MediaSection
        heading="Who we are"
        body="Our founder, Zander Lynch, first discovered disc golf at the age of six, 
        and it quickly became a family passion. After competing in over 
        60 PDGA tournaments and working at a local disc golf store, he 
        began experimenting with dyeing discs in 2022. Through these experiences, they gained a deep 
        appreciation for the unique challenges and joys of the sport, as well as a desire to contribute 
        something special to the disc golf world."
        image={whoWeAreImage}
        classNames="bg-gradient-to-l from-tint-9 to-tint-6 border-t-8 border-t-tint-6"
        leftBased={false}
      />
      <MediaSection
        heading="What we do"
        body="At Z-dyes, we specialize in creating custom dyed discs that are as unique as the players who throw them. Our founder began experimenting with disc dyeing techniques in 2022, driven by a desire 
        to create discs that not only perform well but also look stunning in flight.
        Through a proprietary process, we developed a signature style that transforms ordinary discs 
        into mesmerizing works of art."
        image={whatWeDoImage}
        classNames="bg-gradient-to-r from-tint-9 to-tint-6 border-t-8 border-t-tint-6"
        leftBased={true}
        roundedImage
      />
      <Contact />
    </main>
  );
}
