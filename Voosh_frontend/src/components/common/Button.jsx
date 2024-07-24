/* eslint-disable react/prop-types */
import React from "react";

export default function Button(props) {
  return (
    <div className="text-center">
      <button
        {...props}
        className={`border text-white bg-blue-500 py-1 text-lg px-3 rounded-md whitespace-nowrap   ${props.className} `}
      >
        {props.children}
      </button>
    </div>
  );
}
