import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';

const ResizableComponent = ({ children }:{
    children?:any
}) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <Resizable
      //@ts-ignore   
      ref={connect}
      defaultSize={{
        width: 200,
        height: 200,
      }}
      style={{
        border: '1px solid #ddd',
        background: '#f0f0f0',
      }}
      minWidth={100}
      minHeight={100}
      maxWidth={500}
      maxHeight={500}
      enable={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
        {/* @ts-ignore */}
      <div ref={drag} className="handle" style={{ padding: '10px', cursor: 'move' }}>
        Drag here
      </div>
      {children}
    </Resizable>
  );
};

export const ResizableComponentSettings = () => {
  const { actions: { setProp } } = useNode((node) => ({
    width: node.data.props.width,
    height: node.data.props.height,
  }));

  return (
    <div>
      <h4>Resizable Component Settings</h4>
      {/* Add any additional settings here */}
    </div>
  );
};

ResizableComponent.craft = {
  props: {
    width: 200,
    height: 200,
  },
  related: {
    settings: ResizableComponentSettings,
  },
};

export default ResizableComponent;