import type { ComponentProps, ReactNode } from "react";

export type H1Type = {
  children: ReactNode;
} & ComponentProps<"h1">;

/** *
 * @function H1
 *
 * @see {@link https://rfui.deno.dev/atoms/h1}
 *
 * @example
 * <H1>Heading</H1>
 */
export const H1 = ({ children, ...rest }: H1Type): JSX.Element => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "text-4xl text-neutral-700 mt-9 mb-7 max-w-prose";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <h1 className={className} {...restWithoutClass}>
      {children}
    </h1>
  );
};
