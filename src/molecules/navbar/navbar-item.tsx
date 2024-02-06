import * as React from "react";
import { ReactNode } from "react";
import { Link } from "../../atoms/link";
import { Container } from "../../helpers/container";
import { ChevronRightIcon } from "../../icons/chevron-right";

export const NavbarItem = ({
  href,
  isActive = false,
  children,
  ...rest
}: {
  href: string;
  isActive?: boolean;
  children: ReactNode;
} & React.LiHTMLAttributes<HTMLLIElement>) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass =
    "inline-block border-b border-b-neutral-200 sm:border-b-neutral-50 max-sm:hover:bg-neutral-100/50";

  if (isActive) {
    containerClass +=
      " font-bold pointer-events-none sm:font-normal sm:border-b-primary-500 max-sm:bg-neutral-100";
  } else {
    containerClass += " sm:hover:border-b-neutral-500 text-neutral-700";
  }

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  // For `size="xl"` below it doesn't matter that `"xl"` might not be accurate
  return (
    <li className={containerClass} {...restWithoutClass}>
      {/* Mobile */}
      <Container size="xl" className="block sm:hidden">
        <Link
          href={href}
          underline="none"
          aria-current={isActive ? "page" : undefined}
          className="py-6 flex items-center justify-between"
        >
          <div>{children}</div>
          <ChevronRightIcon class="relative top-px" />
        </Link>
      </Container>

      {/* Desktop */}
      <Link
        href={href}
        underline="none"
        className="py-6 hidden sm:inline-block"
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>
    </li>
  );
};
