interface MediaSectionProps {
  heading: string;
  body: string;
  image: string;
  classNames: string;
  leftBased: boolean;
  alt?: string;
  roundedImage?: boolean;
}

export default function MediaSection({
  heading,
  body,
  image,
  classNames,
  leftBased,
  alt,
  roundedImage,
}: MediaSectionProps) {
  const renderedText = (
    <div>
      <h2 className="font-black capitilize text-7xl text-shade-2 mb-10 tracking-tighter">
        {heading}
      </h2>
      <p className="mb-6 text-2xl text-shade-2 font-medium leading-10 mb-12">
        {body}
      </p>
    </div>
  );
  const renderedImage = (
    <div
      className={`max-w-[26rem] relative overflow-hidden ${
        (roundedImage && "rounded-full") || "rounded-lg"
      } ${!leftBased ? "md:col-start-1 md:row-start-1" : ""} shadow-2xl`}
    >
      <img src={image} alt={alt || ""} className="w-full" />
    </div>
  );

  return (
    <section className={`px-10 h-max py-10 ${classNames}`}>
      <div className="md:h-[80vh] max-w-7xl grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 justify-items-center items-center center-container-x gap-8">
        {renderedText}
        {renderedImage}
      </div>
    </section>
  );
}
