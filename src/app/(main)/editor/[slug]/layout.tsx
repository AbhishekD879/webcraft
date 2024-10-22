"use client";
import { Editor } from "@craftjs/core";
import { Button as EditorBtn } from "./_editor_component/Button";


import Container from "./_editor_component/Container";
import { VideoComponent } from "./_editor_component/EditorVideo";
import { ImageComponent } from "./_editor_component/EditorImage";
import ResizeWrapper from "./_editor_component/ResizeWrapper";
import { Grid } from "./_editor_component/EditorGrid";
import { FlexContainer } from "./_editor_component/EditorFlex";
import { ParagraphComponent } from "./_editor_component/EditorParagraph";
import { InlineTextComponent } from "./_editor_component/EditorText";
import ResizerCustom from "./_components/ResizerCustom";
import { useContext } from "react";
import { EditingContext, editingContext } from "@/lib/context/EditorContext";
export default function layout({ children }: { children: any }) {
  const { previewing } = useContext(editingContext);
  return (
    <EditingContext>
      <Editor
        enabled={!previewing}
        resolver={{
          EditorBtn,
          Container,
          VideoComponent,
          ImageComponent,
          Grid,
          FlexContainer,
          ParagraphComponent,
          ResizeWrapper,
          ResizerCustom,
          InlineTextComponent,
        }}
      >
        {children}
      </Editor>
    </EditingContext>
  );
}
