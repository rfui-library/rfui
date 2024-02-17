import type { ComponentProps, ReactNode } from "react";
import * as React from "react";
import { RadioButton, RadioButtonType } from "../atoms/radio-button";
import { Stack } from "../helpers/stack";

export type RadioButtonGroupType = {
  name?: string;
  onChange?: (newSelectedVal: RadioButtonType["value"]) => void;
  children: ReactNode;
};

export type RadioButtonGroupItemType = {
  name?: string;
  value?: RadioButtonType["value"];
  radioButtonRest?: Omit<RadioButtonType, "size" | "name" | "value">;
  children: ReactNode;
} & ComponentProps<"label">;

/** *
 * @function RadioButtonGroup
 *
 * @see {@link https://rfui.deno.dev/molecules/radio-button-group}
 *
 * @example
 * <RadioButtonGroup name="plan">
 *   <RadioButtonGroupItem value="free">
 *     Free
 *   </RadioButtonGroupItem>
 *   <RadioButtonGroupItem value="basic">
 *     Basic
 *   </RadioButtonGroupItem>
 *   <RadioButtonGroupItem value="premium">
 *     Premium
 *   </RadioButtonGroupItem>
 * </RadioButtonGroup>
 */

export const RadioButtonGroup = ({
  name,
  children,
  onChange,
}: RadioButtonGroupType) => {
  return (
    <Stack className="gap-3">
      {React.Children.toArray(children)
        // deno-lint-ignore no-explicit-any
        .map((child: any) =>
          React.cloneElement(child, {
            name,
            onClick: () => {
              if (onChange) {
                onChange(child.props.value);
              }
            },
          }),
        )}
    </Stack>
  );
};

export const RadioButtonGroupItem = ({
  name,
  value,
  radioButtonRest,
  children,
  ...rest
}: RadioButtonGroupItemType) => {
  const { className: restClass, ...restWithoutClass } = rest;

  return (
    <label
      className={`flex gap-3 items-center cursor-pointer ${restClass}`}
      {...restWithoutClass}
    >
      <RadioButton name={name} value={value} {...radioButtonRest} />
      <div>{children}</div>
    </label>
  );
};
