"use client";
import { useEditor } from "@craftjs/core";
import { SettingsIcon } from "lucide-react";
import React from "react";

export default function EditorComponentSettings() {
  const { selected, nodeSettings } = useEditor((state, query) => {
    const selectedNodeId = query.getEvent('selected').first();
    
    if (!selectedNodeId) {
      return {
        selected: null,
        nodeSettings: null
      };
    }

    // Get the selected node
    const node = state.nodes[selectedNodeId];
    
    // Get the first child node if it exists (for ResizeWrapper cases)
    const childNodeId = query.node(selectedNodeId).childNodes()[0];
    const childNode = childNodeId ? state.nodes[childNodeId] : null;

    // Check both the main node and child node for toolbar settings
    const toolbarComponent = childNode?.related?.toolbar || node?.related?.toolbar;

    return {
      selected: selectedNodeId,
      nodeSettings: toolbarComponent
    };
  });

  if (!selected || !nodeSettings) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2" />
            Select an element to edit
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <SettingsIcon className="h-5 w-5 mr-2" />
          Element Settings
        </h3>
      </div>
      <div className="settings-content">
        {React.createElement(nodeSettings)}
      </div>
    </div>
  );
}