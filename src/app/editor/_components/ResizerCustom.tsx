"use client";
import { useEditor, useNode } from "@craftjs/core";
import { Resizable } from "re-resizable";
import type { Node } from "@craftjs/core";
import { useEffect } from "react";
type props = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
};

export default function ResizerCustom({ children }: props) {
  const { actions } = useEditor();
  const {
    isSelected,
    id,
    connectors: { connect, drag },
    actions: { setCustom },
  } = useNode((node) => ({
    isSelected: node.events.selected,
    id: node.id,
  }));
  useEffect(() => {
    const handleDeletePress = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        actions.delete(id);
      }
    };
    document.addEventListener("keydown", handleDeletePress);
    return () => {
      document.removeEventListener("keydown", handleDeletePress);
    };
  }, []);
  const setIsResizing = (isResizing: boolean) => {
    setCustom((custom: any) => {
      console.log(custom);
      return {
        isResizing: isResizing,
        ...custom,
      };
    });
  };
  console.log("Seleted", isSelected);
  const handleOnResizeStart = () => {
    setIsResizing(true);
  };
  const handleOnResizeStop = () => {
    setIsResizing(false);
  };
  return (
    <Resizable
      //@ts-ignore
      ref={(ref) => connect(drag(ref?.resizable!))}
      defaultSize={{
        width: 320,
        height: 200,
      }}
      onResizeStart={handleOnResizeStart}
      onResizeStop={handleOnResizeStop}
      style={{
        borderWidth: isSelected ? "2px" : 0,
        borderColor: isSelected ? "#333" : "#ddd",
        borderStyle: "solid",
        overflow: "hidden",
      }}
    >
      <p>Hi From Custom</p>
      {children && children}
    </Resizable>
  );
}

ResizerCustom.craft = {
  props: {
    width: "50%",
    height: "2rem",
  },
  rules: {
    canDrag: (node: Node) => {
      console.log("Resizing", node.data.custom.isResizing);
      return !node.data.custom.isResizing;
    },
  },
  custom: {
    isResizing: false,
  },
};
