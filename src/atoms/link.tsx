import * as React from "react";
import { ReactNode } from "react";
import { NewTabIcon } from "../icons/new-tab-icon";

export type LinkType = {
  href: string;
  underline?: "always" | "hover" | "none";
  inPageLink?: boolean;
  _newTab?: boolean;
  _includeNewTabIcon?: boolean;
  children: ReactNode;
} & React.LinkHTMLAttributes<HTMLAnchorElement>;

/** *
 * @function Link
 *
 * @see {@link https://rfui.deno.dev/atoms/link}
 *
 * @example
 * <Link href="https://example.com">Example</Link>
 */
export const Link = ({
  href,
  underline = "always",
  inPageLink = false,
  _newTab = false,
  _includeNewTabIcon = false,
  children,
  ...rest
}: LinkType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "cursor-pointer relative";

  className += (() => {
    switch (underline) {
      case "always":
        return " underline underline-offset-2 text-primary-700 visited:text-primary-800 [aria-current]:text-primary-800";
      case "hover":
        return " hover:underline hover:underline-offset-2";
      default:
        return "";
    }
  })();

  if (inPageLink) {
    className += " rfui-in-page-link";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <a
      href={href}
      className={className}
      target={_newTab ? "_blank" : undefined}
      rel={_newTab ? "noopener noreferrer" : undefined}
      {...restWithoutClass}
    >
      {inPageLink && (
        <span className="rfui-in-page-link-icon absolute top-0 -left-[1em]">
          #
        </span>
      )}
      {children}
      {_newTab && _includeNewTabIcon && <NewTabIcon />}
    </a>
  );
};
