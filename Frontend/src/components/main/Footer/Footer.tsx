import { Link } from "react-router-dom";
import FooterLinks, { LinkProps } from "./FooterLinks";
import FooterBranding from "./FooterBranding";
import { CiInstagram, CiTwitter, CiFaceSmile } from "react-icons/ci";

interface LinksObject {
  dyesLinks: LinkProps[];
  companyLinks: LinkProps[];
  resourcesLinks: LinkProps[];
}

export default function Footer() {
  const links: LinksObject = {
    dyesLinks: [
      { to: "/shop", text: "Shop" },
      { to: "/about", text: "About us" },
      { to: "/contact", text: "Contact us" },
    ],
    companyLinks: [
      // { to: "/", text: "Lorem" },
      // { to: "/", text: "Lorem" },
      // { to: "/", text: "Lorem" },
    ],
    resourcesLinks: [
      // { to: "/", text: "Lorem" },
      // { to: "/", text: "Lorem" },
      // { to: "/", text: "Lorem" },
    ],
  };

  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-shade-2">
      <div className="p-10 grid lg:grid-cols-custom-2 md:grid-cols-6 grid-cols-2 text-tint-6 gap-4 gap-y-16 md:gap-y-10">
        <FooterBranding />
        <div className="grid grid-cols-3 col-span-3 lg:grid-cols-1 lg:col-auto lg:justify-items-start justify-items-center items-center">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiInstagram className="size-32 md:size-20" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiTwitter className="size-32 md:size-20" />
          </a>
          <CiFaceSmile className="size-32 md:size-20" />
        </div>
        <FooterLinks heading="Z Dyes" links={links.dyesLinks} />
        <FooterLinks heading="Company" links={links.companyLinks} />
        <FooterLinks heading="Resources" links={links.resourcesLinks} />
      </div>
      <p className="text-center text-tint-4 pb-2">Copyright @ {year} Z-dyes </p>
    </footer>
  );
}
