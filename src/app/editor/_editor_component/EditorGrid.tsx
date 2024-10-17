"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { GridIcon } from "lucide-react";

type GridProps = {
  columns?: string;
  gap?: string;
  width?: string;
  height?: string;
  parConnect?: any;
};

export const GridInner = ({
  columns = "repeat(3, 1fr)",
  gap = "10px",
  width = "100%",
  height = "100%",
  parConnect,
}: GridProps) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      //@ts-ignore
      ref={(ref) => {
        if (ref && parConnect) parConnect(ref);
      }}
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gap,
        width,
        height,
      }}
    >
      {/* Children components go here */}
    </div>
  );
};

const GridToolbarSettings = () => {
    const { setProp, columns, gap } = useNode((node) => ({
      columns: node.data.props.columns,
      gap: node.data.props.gap,
    }))
  
    const parseColumns = (columns: string) => {
      const match = columns.match(/repeat$$(\d+),\s*1fr$$/)
      return match ? parseInt(match[1]) : 3
    }
  
    const updateColumns = (value: number) => {
      setProp((props) => (props.columns = `repeat(${value}, 1fr)`))
    }
  
    const parseGap = (gap: string) => {
      return parseInt(gap)
    }
  
    const updateGap = (value: number) => {
      setProp((props) => (props.gap = `${value}px`))
    }
  
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="grid-settings">
          <AccordionTrigger className="text-sm font-medium">
            <GridIcon className="w-4 h-4 mr-2" />
            Grid Settings
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grid-columns" className="text-xs font-medium">
                Columns: {parseColumns(columns)}
              </Label>
              <Slider
                id="grid-columns"
                min={1}
                max={12}
                step={1}
                value={[parseColumns(columns)]}
                onValueChange={([value]) => updateColumns(value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grid-gap" className="text-xs font-medium">
                Gap: {parseGap(gap)}px
              </Label>
              <Slider
                id="grid-gap"
                min={0}
                max={50}
                step={1}
                value={[parseGap(gap)]}
                onValueChange={([value]) => updateGap(value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-columns" className="text-xs font-medium">
                Custom Columns
              </Label>
              <Input
                id="custom-columns"
                type="text"
                value={columns}
                onChange={(e) => setProp((props) => (props.columns = e.target.value))}
                placeholder="e.g., 1fr 2fr 1fr"
                className="text-xs"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  

export const Grid = () => {
  const {
    connectors: { connect },
    nodeProps,
  } = useNode((node) => ({
    nodeProps: node.data.props,
  }));

  return (
    <ResizeWrapper>
      <GridInner parConnect={connect} {...nodeProps} />
    </ResizeWrapper>
  );
};

Grid.craft = {
  related: {
    toolbar: GridToolbarSettings,
  },
  props: {
    columns: "repeat(3, 1fr)",
    gap: "10px",
    width: "500px",
    height: "200px",
  },
  displayName: "Grid",
};
