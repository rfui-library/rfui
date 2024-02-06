import * as React from "react";
import { ReactNode } from "react";

export type HighlightType = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLUnknownElement>;

/** *
 * @function Highlight
 *
 * @see {@link https://rfui.deno.dev/atoms/highlight}
 *
 * @example
 * <div>Lorem ipsum <Highlight>dolor</Highlight> sit amet, consectetur.</div>
 */
export const Highlight = ({ children, ...rest }: HighlightType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "bg-primary-100";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <mark className={className} {...restWithoutClass}>
      {children}
    </mark>
  );
};
