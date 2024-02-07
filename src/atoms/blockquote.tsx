import * as React from "react";
import { ReactNode } from "react";

export type BlockquoteType = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLQuoteElement> & { cite: string };

/** *
 * @function Blockquote
 *
 * @see {@link https://rfui.deno.dev/atoms/blockquote}
 *
 * @example
 * <Blockquote>All models are wrong. Some models are useful.</Blockquote>
 */
export const Blockquote = ({ children, ...rest }: BlockquoteType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className =
    "border-l border-neutral-300 pl-5 text-neutral-700 flex flex-col gap-3";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <blockquote {...restWithoutClass} className={className}>
      {children}
    </blockquote>
  );
};
