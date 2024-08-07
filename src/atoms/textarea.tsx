import type { ComponentProps, ReactNode } from "react";

export type TextareaType = {
  rounded?: "square" | "sm" | "lg";
  invalid?: boolean;
  children?: ReactNode;
} & ComponentProps<"textarea">;

/** *
 * @function Textarea
 *
 * @see {@link https://rfui.deno.dev/atoms/textarea}
 *
 * @example
 * <Textarea></Textarea>
 */
export const Textarea = ({
  rounded,
  invalid = false,
  children,
  ...rest
}: TextareaType): JSX.Element => {
  const { className: restClass, ...resstWithoutClass } = rest;
  let className =
    "border border-neutral-500 px-2 py-1 focus:outline-none focus:border-neutral-900 focus:shadow-sm";

  className +=
    " " +
    (() => {
      switch (rounded) {
        case "square":
          return "rounded-none";
        case "sm":
          return "rounded";
        case "lg":
          return "rounded-lg";
        default:
          return "rfui-rounded-default";
      }
    })();

  if (rest.disabled) {
    className += " cursor-not-allowed bg-neutral-50";
  }

  if (rest.readOnly) {
    className += " cursor-not-allowed";
  }

  if (invalid) {
    className +=
      " border-supporting-red-300 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-700";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <textarea className={className} {...resstWithoutClass}>
      {children}
    </textarea>
  );
};
