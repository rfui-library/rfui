import type { ComponentProps, ReactNode } from "react";
import * as React from "react";
import { RadioButton, type RadioButtonType } from "../atoms/radio-button.tsx";
import { Stack } from "../helpers/stack.tsx";

export type RadioButtonGroupType = {
  name?: string;
  selectedValue?: RadioButtonType["value"];
  onChange?: (newSelectedVal: RadioButtonType["value"]) => void;
  children: ReactNode;
} & ComponentProps<"div">;

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
  selectedValue,
  onChange,
  children,
  ...rest
}: RadioButtonGroupType): JSX.Element => {
  const { className: restClass, ...restWithoutClass } = rest;

  return (
    <Stack className={`gap-3 ${restClass}`} {...restWithoutClass}>
      {React.Children.toArray(children)
        // deno-lint-ignore no-explicit-any
        .map((child: any) =>
          React.cloneElement(child, {
            name,
            radioButtonRest: {
              checked:
                onChange && selectedValue
                  ? selectedValue === child.props.value
                  : undefined,
            },
            onClick: () => {
              if (onChange) {
                onChange(child.props.value);
              }
            },
          })
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
}: RadioButtonGroupItemType): JSX.Element => {
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
