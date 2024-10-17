import { useNode } from "@craftjs/core";
import { Resizable } from "re-resizable";
import Indicators from "../_components/Indicators";
import { useState } from "react";

export default function ResizeWrapper({ children }: { children: any }) {
  const [active, setActive] = useState(false);
  const {
    isHovered,
    isSelected,
    connectors: { connect, drag },
    nodeRef,
  } = useNode((node) => ({
    isSelected: node.events.selected,
    isHovered: node.events.hovered,
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
          ref={(ref) => {
            if (ref && ref.resizable) {
              connect(ref.resizable);
            }
          }}
          onResizeStart={handleOnResizeStart}
          onResizeStop={handleOnResizeStop}
          style={{
            borderWidth: isSelected || isHovered ? "2px" : 0,
            borderColor: isSelected || isHovered ? "#333" : "#ddd",
            borderStyle: "solid",
            overflow: "hidden",
            padding: "5px",
          }}
        >
          {children}
        </Resizable>
      </span>
    </>
  );
}

