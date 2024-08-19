import { Link } from "react-router-dom";

export interface LinkProps {
  to: string;
  text: string;
}

export interface FooterLinkProps {
  heading: string;
  links: LinkProps[];
}

export default function FooterLinks({ heading, links }: FooterLinkProps) {
  const renderedLinks = links.map((link) => {
    return (
      <Link
        to={link.to}
        key={link.to}
        className="font-bold tracking-wider text-4xl md:text-xl border-b-2 border-b-transparent hover:border-b-tint-1"
      >
        {link.text}
      </Link>
    );
  });

  return (
    <div className="flex flex-col gap-5 lg:col-auto col-span-2 md:justify-self-start justify-self-center md:text-start text-center mb-10 md:mb-0">
      <h3 className="uppercase font-extrabold text-6xl md:text-2xl text-tint-1 mb-4 tracking-tight">
        {heading}
      </h3>
      {renderedLinks}
    </div>
  );
}
