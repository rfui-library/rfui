import * as React from "react";
import { ReactNode } from "react";
import { Container, type ContainerType } from "../../helpers/container";
import { Flex } from "../../helpers/flex";
import { Stack } from "../../helpers/stack";
import { getComponents } from "./get-components";

export { NavbarItem } from "./navbar-item";
export { NavbarLeft } from "./navbar-left";
export { NavbarRight } from "./navbar-right";

export type NavbarType = {
  size?: ContainerType["size"];
  background?: "neutral" | "none";
  sticky?: boolean;
  children: ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "size">;

/** *
 * @function Navbar
 *
 * @see {@link https://rfui.deno.dev/molecules/navbar}
 *
 * @example
 * <Navbar size="xl">
 *  <NavbarLeft>
 *    <NavbarItem href="https://one.com">One</NavbarItem>
 *    <NavbarItem href="https://two.com">Two</NavbarItem>
 *   </NavbarLeft>
 * </Navbar>
 */
export const Navbar = ({
  size,
  background = "neutral",
  sticky = false,
  children,
  ...rest
}: NavbarType) => {
  const { navbarLeft, navbarRight, numItems } = getComponents(children);
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass = "w-full px-auto";

  if (sticky) {
    containerClass += " sm:sticky sm:top-0 sm:left-0 sm:z-10";
  }

  containerClass +=
    " " +
    (() => {
      switch (background) {
        case "neutral":
          return "bg-neutral-50";
        case "none":
          return "border-b border-b-neutral-100";
      }
    })();

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  return (
    <nav className={containerClass} {...restWithoutClass}>
      {/* Mobile */}
      <Stack className="sm:hidden">
        {navbarLeft && navbarLeft}
        {navbarRight && navbarRight}
      </Stack>

      {/* Desktop */}
      <Container size={size} className="hidden sm:block">
        <Flex className="justify-between">
          {navbarLeft && navbarLeft}
          {navbarRight && navbarRight}
        </Flex>
      </Container>
    </nav>
  );
};
