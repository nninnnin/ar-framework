import { css } from "@emotion/react";
import React from "react";

const TestInput = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  return (
    <input
      css={css`
        padding: 6px;
        border: 1px solid #ccc;
        outline: none;
      `}
      type="text"
      name={name}
      placeholder={placeholder}
    />
  );
};

export default TestInput;
