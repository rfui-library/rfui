import * as React from "react";
import { ReactNode } from "react";

export type StackType = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/** *
 * @function Stack
 *
 * @see {@link https://rfui.deno.dev/helpers/stack}
 *
 * @example
 * <Stack>
 *   <div>top</div>
 *   <div>middle</div>
 *   <div>bottom</div>
 * </Stack>
 */
export const Stack = ({ children, ...rest }: StackType) => {
  const { className: classFromRest, ...restWithoutClass } = rest;
  let classValue = "flex flex-col";

  if (classFromRest) {
    classValue += ` ${classFromRest}`;
  }

  return (
    <div className={classValue} {...restWithoutClass}>
      {children}
    </div>
  );
};
