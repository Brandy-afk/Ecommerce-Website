import cn from "classnames";

interface ImageProps {
  src: string;
  alt: string;
  classNames?: string;
  [key: string]: any; // Rest parameter
}

export default function Image({ src, alt, classNames, ...rest }: ImageProps) {
  const classes = cn("self-center", classNames);

  // px-8 py-8
  return (
    <figure {...rest} className={classes}>
      <img src={src} alt={alt} className="w-full object-cover" />
    </figure>
  );
}
