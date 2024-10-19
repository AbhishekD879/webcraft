import { useNode, useEditor } from '@craftjs/core';
import cx from 'classnames';
import debounce  from 'debounce';
import { Resizable } from 're-resizable';
import React, { useRef, useEffect, useState, useCallback, RefObject } from 'react';

import {
    isPercentage,
    pxToPercent,
    percentToPx,
    getElementDimensions,
  } from '@/lib/numTOMeasurment';

  const Indicators = ({ bound }:{
    bound?: 'row' | 'column'
  }) => {
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className={`absolute w-2.5 h-2.5 bg-white rounded-full shadow-lg z-50 border-2 border-teal-500 
          ${bound ? 'left-1/2 top-[-5px] transform -translate-x-1/2' : 'left-[-5px] top-[-5px]'}`} />
        <span className={`absolute w-2.5 h-2.5 bg-white rounded-full shadow-lg z-50 border-2 border-teal-500 
          right-[-5px] top-[-5px] ${bound ? 'hidden' : 'block'}`} />
        <span className={`absolute w-2.5 h-2.5 bg-white rounded-full shadow-lg z-50 border-2 border-teal-500 
          ${bound ? 'left-1/2 bottom-[-5px] transform -translate-x-1/2' : 'left-[-5px] bottom-[-5px]'}`} />
        <span className={`absolute w-2.5 h-2.5 bg-white rounded-full shadow-lg z-50 border-2 border-teal-500 
          bottom-[-5px] right-[-5px] ${bound ? 'hidden' : 'block'}`} />
      </div>
    );
  };


export const Resizer = ({ propKey, children, ...props }: any) => {
    const {
      id,
      actions: { setProp },
      connectors: { connect },
      fillSpace,
      nodeWidth,
      nodeHeight,
      parent,
      active,
      inNodeContext,
    } = useNode((node) => ({
      parent: node.data.parent,
      active: node.events.selected,
      nodeWidth: node.data.props[propKey.width],
      nodeHeight: node.data.props[propKey.height],
      fillSpace: node.data.props.fillSpace,
    }));
  
    const { isRootNode, parentDirection } = useEditor((state, query) => {
      return {
        parentDirection:
          parent &&
          state.nodes[parent] &&
          state.nodes[parent].data.props.flexDirection,
        isRootNode: query.node(id).isRoot(),
      };
    });
  
    const resizable = useRef<Resizable>(null);
    const isResizing = useRef<Boolean>(false);
    const editingDimensions = useRef<any>(null);
    const nodeDimensions = useRef<{ width: any; height: any } | null>(null);
    if (nodeDimensions.current === null) {
        nodeDimensions.current = { width: nodeWidth, height: nodeHeight };
    } else {
        nodeDimensions.current.width = nodeWidth;
        nodeDimensions.current.height = nodeHeight;
    }
  
    /**
     * Using an internal value to ensure the width/height set in the node is converted to px
     * because for some reason the <re-resizable /> library does not work well with percentages.
     */
    const [internalDimensions, setInternalDimensions] = useState({
      width: nodeWidth,
      height: nodeHeight,
    });
  
    const updateInternalDimensionsInPx = useCallback(() => {
      if (!nodeDimensions.current) return;
      const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;

      const width = percentToPx(
        nodeWidth,
        resizable.current?.parentNode?.clientWidth ?? 0
      );
      const height = percentToPx(
        nodeHeight,
        resizable.current?.parentNode?.clientHeight ?? 0
      );

      setInternalDimensions({
        width,
        height,
      });
    }, []);
  
    const updateInternalDimensionsWithOriginal = useCallback(() => {
        if (!nodeDimensions.current) return;
      const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;
      setInternalDimensions({
        width: nodeWidth,
        height: nodeHeight,
      });
    }, []);
  
    const getUpdatedDimensions = (width:any, height:any) => {
      const dom = resizable.current?.resizable;
      if (!dom) return;
  
      const currentWidth = parseInt(editingDimensions.current.width),
        currentHeight = parseInt(editingDimensions.current.height);
  
      return {
        width: currentWidth + parseInt(width),
        height: currentHeight + parseInt(height),
      };
    };
  
    useEffect(() => {
      if (!isResizing.current) updateInternalDimensionsWithOriginal();
    }, [nodeWidth, nodeHeight, updateInternalDimensionsWithOriginal]);
  
    useEffect(() => {
      const listener = debounce(updateInternalDimensionsWithOriginal, 1);
      window.addEventListener('resize', listener);
  
      return () => {
        window.removeEventListener('resize', listener);
      };
    }, [updateInternalDimensionsWithOriginal]);
  
    return (
      <Resizable
        enable={[
          'top',
          'left',
          'bottom',
          'right',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight',
        ].reduce((acc: any, key) => {
          acc[key] = active && inNodeContext;
          return acc;
        }, {})}
        className={cx([
          {
            'm-auto': isRootNode,
            flex: true,
          },
        ])}
        ref={(ref) => {
          //@ts-ignore  
          if (ref) {
            // @ts-nocheck
            // @ts-ignore
            resizable.current = ref;
            if(!ref.resizable) return
            connect(ref.resizable);
          }
        }}
        size={internalDimensions}
        onResizeStart={(e) => {
          updateInternalDimensionsInPx();
          e.preventDefault();
          e.stopPropagation();
          if(!resizable.current) return
          const dom = resizable.current.resizable;
          if (!dom) return;
          editingDimensions.current = {
            width: dom.getBoundingClientRect().width,
            height: dom.getBoundingClientRect().height,
          };
          isResizing.current = true;
        }}
        onResize={(_, __, ___, d) => {
          if(!resizable.current)  return
          const dom = resizable.current.resizable;
          if(!dom) return
          let { width, height }: any = getUpdatedDimensions(d.width, d.height);
          if (isPercentage(nodeWidth))
            width =
              pxToPercent(width, getElementDimensions(dom.parentElement as HTMLElement).width) +
              '%';
          else width = `${width}px`;
  
          if (isPercentage(nodeHeight))
            height =
              pxToPercent(
                height,
                getElementDimensions(dom.parentElement as HTMLElement).height
              ) + '%';
          else height = `${height}px`;
  
          if (isPercentage(width) && dom.parentElement?.style.width === 'auto') {
            width = editingDimensions.current.width + d.width + 'px';
          }
  
          if (isPercentage(height) && dom.parentElement?.style.height === 'auto') {
            height = editingDimensions.current.height + d.height + 'px';
          }
  
          setProp((prop: any) => {
            prop[propKey.width] = width;
            prop[propKey.height] = height;
          }, 500);
        }}
        onResizeStop={() => {
          isResizing.current = false;
          updateInternalDimensionsWithOriginal();
        }}
        {...props}
      >
        {children}
        {active && (
          <Indicators bound={fillSpace === 'yes' ? parentDirection : false}>
            {/* <span></span>
            <span></span>
            <span></span>
            <span></span> */}
          </Indicators>
        )}
      </Resizable>
    );
  };
