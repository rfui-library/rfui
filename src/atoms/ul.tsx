import type { ComponentProps, ReactNode } from "react";

export type ULType = {
  bulletType?: "bullet" | "check" | "arrow" | "triangle" | "none";
  bulletLocation?: "inside" | "outside";
  children: ReactNode;
} & ComponentProps<"ul">;

/** *
 * @function UL
 *
 * Useful blog post: https://css-tricks.com/list-style-recipes/
 *
 * @see {@link https://rfui.deno.dev/atoms/ul}
 *
 * @example
 * <UL>
 *   <li>One</li>
 *   <li>Two</li>
 *   <li>Three</li>
 * </UL>
 */
export const UL = ({
  bulletType = "bullet",
  bulletLocation = "inside",
  children,
  ...rest
}: ULType): JSX.Element => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-unordered-list flex flex-col gap-2 list-outside";

  const bulletTypeMap = {
    bullet: "list-disc",
    check: "list-check",
    arrow: "list-arrow",
    triangle: "list-triangle",
    none: "list-none",
  };
  // @ts-expect-error this works
  className += ` ${bulletTypeMap[bulletType]}`;

  if (bulletLocation === "inside" && bulletType === "bullet") {
    className += " ml-4";
  }

  if (bulletLocation === "outside" && bulletType !== "bullet") {
    className += " -ml-4";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <>
      <style>
        {`
          ul.rfui-unordered-list.list-check li::before {
            content: '✔ ';
            margin-right: 0.5em;
          }

          ul.rfui-unordered-list.list-arrow li::before {
            content: '→ ';
            margin-right: 0.5em;
          }

          ul.rfui-unordered-list.list-triangle li::before {
            content: '▸ ';
            margin-right: 0.5em;
          }
        `}
      </style>
      <ul className={className} {...restWithoutClass}>
        {children}
      </ul>
    </>
  );
};
