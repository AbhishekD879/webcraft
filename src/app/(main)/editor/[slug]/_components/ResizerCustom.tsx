"use client";
import { useNode } from "@craftjs/core";
import { Resizable } from "re-resizable";
import { useState } from "react";
import Indicators from "./Indicators";
type props = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
};

export default function ResizerCustom({ children }: props) {
  const [active, setActive] = useState(false);
  const {
    isHovered,
    isDragged,
    isSelected,
    connectors: { connect, drag },
    nodeRef,
  } = useNode((node) => ({
    isSelected: node.events.selected,
    isHovered: node.events.hovered,
    isDragged:node.events.dragged,
    id: node.id,
    nodeRef: node,
  }));
  console.log("Seleted", isSelected);
  const handleOnResizeStart = () => {};
  const handleOnResizeStop = () => {};
  return (
    <>
      <span
        onMouseOver={() => setActive(true)}
        onMouseOut={() => setActive(false)}
        className="inline-block w-fit relative"
      >
        {active && <Indicators nodeRef={nodeRef} drag={drag} />}
        <Resizable
          defaultSize={{
            width: 200,
            height: 100,
          }}
          ref={(ref) => {
            if (ref && ref.resizable) {
              connect(ref.resizable);
            }
          }}
          onResizeStart={handleOnResizeStart}
          onResizeStop={handleOnResizeStop}
          style={{
            borderWidth: isSelected || isHovered || isDragged ? "2px" : 0,
            borderColor: isSelected || isHovered || isDragged ? "#333" : "#ddd",
            borderStyle: "solid",
            overflow: "hidden",
            padding: "5px",
          }}
        >
          {children && children}
        </Resizable>
      </span>
    </>
  );
}

ResizerCustom.craft = {
  props: {
    width: "50%",
    height: "2rem",
  },
};

// <div className="absolute -top-4 right-0 z-50 flex gap-2 items-center border border-black">
// <div
//   ref={(ref) => {
//     if (ref) {
//       drag(ref);
//     }
//   }}
// >
//   <Move size={15} />
// </div>
// <div>
//   <Delete size={15} onClick={handleDeletePress} />
// </div>
// </div>
