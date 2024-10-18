"use client";

import { Node, useEditor } from "@craftjs/core";
import { Move, Trash2 } from "lucide-react";

type props = {
  nodeRef: Node;
  drag: any;
};

export default function Indicators({ nodeRef, drag }: props) {
  const { actions } = useEditor();
  const handleDeletePress = (e: any) => {
    e.stopPropagation();
    actions.delete(nodeRef.id);
  };
  return (
    <div className="absolute -top-4 right-0 z-[9999999] flex gap-2 items-center border border-black">
      <div
        ref={(ref) => {
          if (ref) {
            drag(ref);
          }
        }}
      >
        <Move size={15} />
      </div>
      <div>
        <Trash2 size={15} onClick={handleDeletePress} />
      </div>
    </div>
  );
}
