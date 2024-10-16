'use client'
import React from 'react';
import { Resizer } from './Resizer';

const defaultProps = {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fillSpace: 'no',
    padding: ['0', '0', '0', '0'],
    margin: ['0', '0', '0', '0'],
    background: 'white',
    color: { r: 0, g: 0, b: 0, a: 1 },
    shadow: 0,
    radius: 0,
    width: '100%',
    height: '2rem',
    borderWidth:"1px"
  };

const ContainerSection = (props: any) => {
  return (
    <Resizer
      propKey={{ width: 'width', height: 'height' }}
      style={{
        display: 'flex',
        flexDirection: props.flexDirection || 'column',
        alignItems: props.alignItems || 'flex-start',
        justifyContent: props.justifyContent || 'flex-start',
        background: `rgba(${Object.values(props.background || { r: 255, g: 255, b: 255, a: 1 })})`,
        color: `rgba(${Object.values(props.color || { r: 0, g: 0, b: 0, a: 1 })})`,
        padding: `${props.padding || '0'}px`,
        margin: `${props.margin || '0'}px`,
        boxShadow: props.shadow === 0 ? 'none' : `0px 3px 100px ${props.shadow}px rgba(0, 0, 0, 0.13)`,
        borderRadius: `${props.radius}px`,
        flex: props.fillSpace === 'yes' ? 1 : 'unset',
        borderWidth: props.borderWidth,
        borderStyle: "solid",
        borderColor: `rgba(${Object.values(props.borderColor || { r: 0, g: 0, b: 0, a: 1 })})`,
      }}
    >
      {props.children}
    </Resizer>
  );
};

ContainerSection.craft = {
  displayName: 'Container',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
};

export default ContainerSection;
