import type { ComponentProps } from "react";
import * as React from "react";
import { Checkbox } from "../atoms/checkbox";
import { Input } from "../atoms/input";
import type { SelectType } from "../atoms/select";
import { Select } from "../atoms/select";
import { Switch } from "../atoms/switch";
import type { TextareaType } from "../atoms/textarea";
import { Textarea } from "../atoms/textarea";
import { Flex } from "../helpers/flex";
import { XCircleIcon } from "../icons/x-circle-icon";
import { PasswordInput } from "../molecules/password-input";
import type { RadioButtonGroupType } from "../molecules/radio-button-group";
import {
  RadioButtonGroup,
  RadioButtonGroupItem,
} from "../molecules/radio-button-group";

type ExcludedInputProps =
  | "name"
  | "value"
  | "type"
  | "required"
  | "size"
  | "rounded"
  | "invalid"
  | "onChange"
  | "onInput";

export type FormFieldType = {
  label: string;
  name?: ComponentProps<"input">["name"];
  value?: ComponentProps<"input">["value"];
  type?:
    | ComponentProps<"input">["type"]
    | "switch"
    | "rfui-password-input"
    | "textarea"
    | "radio-button-group"
    | "select";
  required?: boolean;
  requiredIndicator?: "text" | "asterisk" | "none";
  optionalIndicator?: "text" | "asterisk" | "none";
  helperText?: string;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  errorText?: string;
  radioButtonGroupOptions?: {
    value: string;
    display: string;
  }[];
  selectOptions?: {
    value: string;
    display: string;
  }[];
  onChange?: (e: any) => void;
  onInput?: (e: any) => void;
  inputRest?: Omit<ComponentProps<"input">, ExcludedInputProps>;
  textareaRest?: Omit<TextareaType, ExcludedInputProps>;
  radioButtonGroupRest?: Omit<RadioButtonGroupType, ExcludedInputProps>;
  selectRest?: Omit<SelectType, ExcludedInputProps>;
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
  radioButtonGroupOptions,
  selectOptions,
  onChange,
  onInput,
  inputRest,
  textareaRest,
  radioButtonGroupRest,
  selectRest,
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
          onChange={onChange}
          onInput={onInput}
          {...inputRest}
        />
      ) : type === "switch" ? (
        <Switch
          id={id}
          name={name}
          value={value}
          required={required}
          className={`mt-1 ${inputRest?.className}`}
          onChange={onChange}
          onInput={onInput}
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
          onChange={onChange}
          onInput={onInput}
          {...inputRest}
        />
      ) : type === "textarea" ? (
        <Textarea
          id={id}
          name={name}
          value={value}
          required={required}
          invalid={invalid}
          className={`block w-full ${textareaRest?.className}`}
          onChange={onChange}
          onInput={onInput}
          {...textareaRest}
        ></Textarea>
      ) : type === "radio-button-group" && radioButtonGroupOptions ? (
        <RadioButtonGroup
          id={id}
          name={name as string}
          className={`block w-full ${radioButtonGroupRest?.className}`}
          onChange={(newVal) => {
            if (onChange) {
              onChange({
                target: {
                  value: newVal,
                },
              });
            }
          }}
          {...radioButtonGroupRest}
        >
          {radioButtonGroupOptions.map(({ value, display }) => (
            <RadioButtonGroupItem value={value}>{display}</RadioButtonGroupItem>
          ))}
        </RadioButtonGroup>
      ) : type === "select" && selectOptions ? (
        <Select
          id={id}
          name={name}
          value={value}
          required={required}
          invalid={invalid}
          className={`block w-full ${selectRest?.className}`}
          onChange={onChange}
          onInput={onInput}
          {...selectRest}
        >
          {selectOptions.map(({ value, display }) => (
            <option value={value}>{display}</option>
          ))}
        </Select>
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
          onChange={onChange}
          onInput={onInput}
          {...inputRest}
        />
      )}
    </div>
  );
};
