import type { ReactNode } from "react";
import * as React from "react";

export const NavbarLeft = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="flex flex-col sm:flex-row items-stretch sm:gap-6">
      {children}
    </ul>
  );
};
