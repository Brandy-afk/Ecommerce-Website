interface SectionType {
  subheading: string;
  heading: string;
  container: JSX.Element;
  isBackground: boolean;
  id?: string;
}

export default function Section({
  subheading,
  heading,
  container,
  isBackground,
  id,
}: SectionType) {
  return (
    <section
      id={id ?? ""}
      className={`w-screen ${isBackground && "bg-tint-8"}`}
    >
      <div className="max-w-7xl center-container-x px-8 py-20">
        <h3 className="uppercase font-extrabold text-2xl text-shade-5 mb-4 tracking-tight">
          {subheading}
        </h3>
        <p className="mb-20 text-shade-2 text-5xl font-extrabold captitilize tracking-tight">
          {heading}
        </p>
        {container}
      </div>
    </section>
  );
}
