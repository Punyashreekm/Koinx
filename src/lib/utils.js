import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const FormFieldTypes = {
  INPUT: "input",
  PASSWORD: "password",
  NUMBER: "number",
  TEXTAREA: "textarea",
  CHECKBOX: "checkbox",
  PHONE_INPUT: "phone-input",
  DATE_PICKER: "date-picker",
  SELECT: "select",
  SKELETON: "skeleton",
  DATE: "date",
  FILE: "file",
  ACCOUNT: "account",
  RADIOGROUP: "radio-group",
  PRODUCT_SELECT: "product-select",
  CUSTOMER_SELECT: "customer-select",
  TOGGLE: "toggle",
  TOGGLE_GROUP_SINGLE: "toggle-group-single",
};

export const convertApiErrorsToFormErrors = (apiErrors) => {
  if (!apiErrors || typeof apiErrors !== "object") return {};

  const formErrors = {};

  Object.keys(apiErrors).forEach((fieldName) => {
    const fieldErrors = apiErrors[fieldName];
    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      formErrors[fieldName] = {
        message: fieldErrors[0],
        type: "api_error",
        ref: {},
      };
    } else if (
      typeof fieldErrors === "object" &&
      fieldErrors !== null &&
      !Array.isArray(fieldErrors)
    ) {
      Object.keys(fieldErrors).forEach((nestedField) => {
        const nestedErrors = fieldErrors[nestedField];
        if (Array.isArray(nestedErrors) && nestedErrors.length > 0) {
          formErrors[`${fieldName}.${nestedField}`] = {
            message: nestedErrors[0],
            type: "api_error",
            ref: {},
          };
        }
      });
    }
  });

  return formErrors;
};
