import classNames from "classnames";

interface SkeletonProp {
  times: number;
  className: string;
}

export function createSkeletons({
  times,
  className,
}: SkeletonProp): JSX.Element[] {
  return Array(times)
    .fill(0)
    .map((ele, i) => {
      return <Skeleton key={i} i={i} className={className} />;
    });
}

export function Skeleton({
  i = 0,
  className,
}: {
  i?: number;
  className: string;
}) {
  const outerClassNames = classNames(
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "rounded",
    "mb-2.5",
    className
  );
  const innerClassNames = classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );

  return (
    <div key={i} className={outerClassNames}>
      <div className={innerClassNames} />
    </div>
  );
}
