import type { ComponentProps } from "react";
import * as React from "react";
import { Checkbox } from "../atoms/checkbox";
import { Input } from "../atoms/input";
import { RadioButton } from "../atoms/radio-button";
import { Switch } from "../atoms/switch";
import { Flex } from "../helpers/flex";
import { XCircleIcon } from "../icons/x-circle-icon";
import { PasswordInput } from "../molecules/password-input";

export type FormFieldType = {
  label: string;
  name?: ComponentProps<"input">["name"];
  value?: ComponentProps<"input">["value"];
  type?: ComponentProps<"input">["type"] | "rfui-password-input" | "switch";
  required?: boolean;
  requiredIndicator?: "text" | "asterisk" | "none";
  optionalIndicator?: "text" | "asterisk" | "none";
  helperText?: string;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  errorText?: string;
  inputRest?: Omit<
    ComponentProps<"input">,
    "name" | "value" | "type" | "required" | "size" | "rounded" | "invalid"
  >;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function FormField
 *
 * @see {@link https://rfui.deno.dev/molecules/form-field}
 *
 * @param requiredIndicator See https://ux.stackexchange.com/q/840/39046 for a discussion.
 *
 * @example
 * <FormField label="Name" />
 */
export const FormField = ({
  label,
  name,
  value,
  type,
  required = false,
  requiredIndicator = "none",
  optionalIndicator = "none",
  helperText,
  size = "md",
  rounded,
  invalid = false,
  errorText,
  inputRest,
  ...rest
}: FormFieldType) => {
  const id = crypto.randomUUID();
  const [smallFontClass, normalFontClass] = (() => {
    switch (size) {
      case "sm":
        return ["text-xs", "text-sm"];
      case "md":
        return ["text-sm", "text-base"];
      case "lg":
        return ["text-base", "text-lg"];
    }
  })();

  return (
    <div {...rest}>
      <label htmlFor={id} className={`mb-1 block ${normalFontClass}`}>
        {label}{" "}
        {required && requiredIndicator === "text" && (
          <span className={`text-neutral-700 ${smallFontClass}`}>
            (required)
          </span>
        )}
        {required && requiredIndicator === "asterisk" && <sup>*</sup>}
        {!required && optionalIndicator === "text" && (
          <span className={`text-neutral-700 ${smallFontClass}`}>
            (optional)
          </span>
        )}
        {!required && optionalIndicator === "asterisk" && <sup>*</sup>}
      </label>
      <div className={`${smallFontClass} text-neutral-700 mb-1`}>
        {helperText}
      </div>
      {invalid && errorText && (
        <Flex
          className={`${smallFontClass} text-supporting-red-700 mb-1 gap-1 items-center`}
        >
          <XCircleIcon className={size === "sm" ? "w-4 h-4" : null} />{" "}
          {errorText}
        </Flex>
      )}
      {type === "checkbox" ? (
        <Checkbox
          id={id}
          name={name}
          value={value}
          required={required}
          size={size}
          invalid={invalid}
          className={`mt-1 ${inputRest?.className}`}
          {...inputRest}
        />
      ) : type === "switch" ? (
        <Switch
          id={id}
          name={name}
          value={value}
          required={required}
          className={`mt-1 ${inputRest?.className}`}
          {...inputRest}
        />
      ) : type === "radio" ? (
        <RadioButton
          id={id}
          name={name}
          value={value}
          required={required}
          size={size}
          invalid={invalid}
          className={`mt-1 ${inputRest?.className}`}
          {...inputRest}
        />
      ) : type === "rfui-password-input" ? (
        <PasswordInput
          id={id}
          name={name}
          value={value}
          required={required}
          size={size}
          rounded={rounded}
          invalid={invalid}
          className={`block w-full ${inputRest?.className}`}
          {...inputRest}
        />
      ) : (
        <Input
          id={id}
          name={name}
          value={value}
          type={type}
          required={required}
          size={size}
          rounded={rounded}
          invalid={invalid}
          className={`block w-full ${inputRest?.className}`}
          {...inputRest}
        />
      )}
    </div>
  );
};
