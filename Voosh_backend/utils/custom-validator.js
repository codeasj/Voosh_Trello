import { body, param, query, validationResult } from "express-validator";

const validators = {
  ":": param,
  "?": query,
  "@": body,
};

function check(key) {
  const validator = validators[key.at(0)];
  if (!validator)
    throw new Error(
      "Missing type of key, append - [: for param] | [? for query] | [@ for body]"
    );
  return validator(key.slice(1));
}

export function validateString(key, config) {
  let newConfig = {
    ...config,
    min: !config?.min && !config?.required ? 0 : config?.min || 1,
    max: config?.max || 500,
  };

  if (!config?.required)
    return check(key)
      .optional()
      .isLength(newConfig)
      .withMessage(
        `${key.slice(1)} must be ${newConfig?.min}-${newConfig?.max} characters`
      );
  return check(key)
    .isLength(newConfig)
    .withMessage(
      `${key.slice(1)} must be ${newConfig?.min}-${newConfig?.max} characters`
    )
    .notEmpty()
    .withMessage(`${key.slice(1)} required`);
}

export function validateEmail(key, required = false) {
  if (!required)
    return check(key)
      .optional()
      .toLowerCase()
      .isEmail()
      .withMessage("invalid email id");

  return check(key)
    .toLowerCase()
    .isEmail()
    .withMessage("invalid email id")
    .notEmpty()
    .withMessage(`${key.slice(1)} required`);
}
export function validatePassword(key, required = false) {
  if (!required)
    return check(key)
      .optional()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxLength: 32,
      })
      .withMessage(
        "weak password, password should be 8-32 characters long with at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
      );
  return check(key)
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      maxLength: 32,
    })
    .withMessage(
      "weak password, password should be 8-32 characters long with at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
    )
    .notEmpty()
    .withMessage("password is required");
}

export function validateEnum(key, type, required = false) {
  if (!type?.enum || !key)
    throw new Error("invalid or no (type or key) passed to validate");

  if (!required)
    return check(key)
      .optional()
      .toLowerCase()
      .isIn(type.enum)
      .withMessage(`${key.slice(1)} can be - ${type.enum.join(" | ")}`);

  return check(key)
    .isIn(type.enum)
    .toLowerCase()
    .withMessage(`${key.slice(1)} can be - ${type.enum.join(" | ")}`)
    .notEmpty()
    .withMessage(`${key.slice(1)} required`);
}
