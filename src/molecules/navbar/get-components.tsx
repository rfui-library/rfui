import * as React from "react";
import { ReactNode } from "react";
import { NavbarLeft } from "./navbar-left.tsx";
import { NavbarRight } from "./navbar-right.tsx";

export const getComponents = (children: ReactNode) => {
  const childrenArray = React.Children.toArray(children);
  const navbarLeft = childrenArray.find(
    (child: any) => child && child.type && child.type.name === NavbarLeft.name
  );
  const navbarRight = childrenArray.find(
    (child: any) => child && child.type && child.type.name === NavbarRight.name
  );

  if (!navbarLeft && !navbarRight) {
    throw new Error(
      "`NavbarLeft` or `NavbarRight` is needed if you pass an array of elements to `Navbar` as `children`."
    );
  }

  const numLeftItems = React.Children.count(navbarLeft);
  const numRightItems = React.Children.count(navbarRight);
  const numItems = numLeftItems + numRightItems;

  return { navbarLeft, navbarRight, numItems };
};
