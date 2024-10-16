import React, { ComponentType, ReactElement } from "react";
import { Element, ElementProps } from "@craftjs/core";

/**
 * Type definition for options used in the HOC
 */
interface WithElementOptions {
  isCanvas?: boolean;
  elementProps?: Omit<ElementProps<React.ComponentProps<any>>, 'is'>; // ElementProps without 'is' because we set 'is' internally
}

/**
 * HOC for wrapping components inside a Craft.js Element
 * @param WrappedComponent - The component to wrap
 * @param options - Configuration options for the Element
 */
function withElement<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithElementOptions = {}
): React.FC<P> {
  const { isCanvas = false, elementProps = {} } = options;

  const EnhancedComponent: React.FC<P> = (props) => {
    return (
      // Wrap the component inside an Element but don't pass Element-specific props to WrappedComponent
      // @ts-ignore
      <Element is={WrappedComponent} canvas={isCanvas} {...elementProps}>
        <WrappedComponent {...props} />
      </Element>
    );
  };

  return EnhancedComponent;
}

export default withElement;
