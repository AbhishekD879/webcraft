'use client'
import { useNode } from "@craftjs/core";

type props = {
  text?: string;
  fontSize?: string;
};

export const Text = ({ text="HI FROM TEXT", fontSize="1rem" }: props) => {
  const { connectors: {connect, drag} } = useNode();
  return (
    
      <span
      //@ts-ignore
      ref={ref => connect(drag(ref))}
      style={{ fontSize,width:"fit-content" }}
      >
        {text}
        {/* <p style={{ fontSize,width:"fit-content" }}>{text}</p> */}
      </span>
    
  );
};
