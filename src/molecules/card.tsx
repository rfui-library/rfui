import type { ComponentProps, ReactNode } from "react";
import React from "react";

export type CardType = {
  rounded?: "square" | "sm" | "lg";
  width?: "sm" | "md" | "lg" | "full";
  shadow?: "sm" | "md" | "lg";
  padding?: "sm" | "md" | "lg";
  topAccent?: boolean;
  leftAccent?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function Card
 *
 * @see {@link https://rfui.deno.dev/molecules/card}
 *
 * @example
 * <Card>Example</Card>
 */
export const Card = ({
  rounded,
  width = "md",
  shadow = "sm",
  topAccent = false,
  leftAccent = false,
  padding = "md",
  children,
  ...rest
}: CardType): JSX.Element => {
  const { cardHeader, cardBody, cardFooter, isArray } = getComponents(children);
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass = "rfui-card max-w-full border border-neutral-100";

  containerClass += ` padding-${padding}`;

  if (topAccent) {
    containerClass += " border-t-primary-500 border-t-2";
  }

  if (leftAccent) {
    containerClass += " border-l-primary-500 border-l-2";
  }

  containerClass +=
    " " +
    (() => {
      switch (width) {
        case "sm":
          return "w-[300px]";
        case "md":
          return "w-[600px]";
        case "lg":
          return "w-[900px]";
        case "full":
          return "w-full";
      }
    })();

  containerClass +=
    " " +
    (() => {
      switch (shadow) {
        case "sm":
          return "shadow";
        case "md":
          return "shadow-md";
        case "lg":
          return "shadow-lg";
      }
    })();

  containerClass +=
    " " +
    (() => {
      switch (rounded) {
        case "square":
          return "rounded-none";
        case "sm":
          return "rounded";
        case "lg":
          return "rounded-lg";
        default:
          return "rfui-rounded-default";
      }
    })();

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  return (
    <div className={containerClass} {...restWithoutClass}>
      {cardHeader && cardHeader}
      {cardBody && isArray ? cardBody : null}
      {cardBody && !isArray ? (
        <div className="rfui-card-body">{cardBody}</div>
      ) : null}
      {cardFooter && cardFooter}
    </div>
  );
};

const getComponents = (children: ReactNode) => {
  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length === 1) {
    return { cardBody: children, isArray: false };
  }

  const cardHeader = childrenArray.find(
    (child: any) => child && child.type && child.type.name === CardHeader.name
  );

  const cardBody = childrenArray.find(
    (child: any) => child && child.type && child.type.name === CardBody.name
  );

  const cardFooter = childrenArray.find(
    (child: any) => child && child.type && child.type.name === CardFooter.name
  );

  if (!cardHeader && !cardBody && !cardFooter) {
    throw new Error(
      "A `CardHeader`, `CardBody` or `CardFooter` is needed if you pass an array of elements to `Card` as `children`."
    );
  }

  return {
    cardHeader,
    cardBody,
    cardFooter,
    isArray: React.Children.count(children) > 1,
  };
};

export const CardHeader = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"div">): JSX.Element => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-card-header";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <div className={className} {...restWithoutClass}>
      {children}
    </div>
  );
};

export const CardBody = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"div">): JSX.Element => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-card-body";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <div className={className} {...restWithoutClass}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"div">): JSX.Element => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-card-footer";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <div className={className} {...restWithoutClass}>
      {children}
    </div>
  );
};
