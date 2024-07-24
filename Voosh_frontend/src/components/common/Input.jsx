/* eslint-disable react/prop-types */
import React, { createContext } from "react";

const WrapperContext = createContext();
export const InputWrapper = ({ children, ...rest }) => {
  return (
    <WrapperContext.Provider value={rest}>{children}</WrapperContext.Provider>
  );
};

export default function Input(props) {
  const commonProps = React.useContext(WrapperContext);
  const { type, name, register, required = false, placeholder } = props;
  const formRegister =
    typeof commonProps.register === "function"
      ? commonProps.register(name)
      : register?.(name);

  return (
    <input
      type={type || commonProps.type}
      placeholder={placeholder}
      required={required}
      name={name}
      {...formRegister}
      className="outline-none rounded border pl-2  w-full border-[lightgrey] h-10"
    />
  );
}
