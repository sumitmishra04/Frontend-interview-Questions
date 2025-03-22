import React from "react";

export interface TextProps {
  content: string;
}

const Text: React.FC<TextProps> = ({ content }) => {
  return <p style={{ fontSize: "18px" }}>{content}</p>;
};

export default Text;
