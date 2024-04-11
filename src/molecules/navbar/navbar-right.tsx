import type { ReactNode } from "react";

export const NavbarRight = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <ul className="flex flex-col sm:flex-row items-stretch sm:gap-6">
      {children}
    </ul>
  );
};
