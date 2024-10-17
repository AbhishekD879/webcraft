'use client'
import { Editor } from "@craftjs/core";
import { Button as EditorBtn } from "./_editor_component/Button";
import { Text } from "./_editor_component/Text";

import Container from "./_editor_component/Container";
import ResizerCustom from "./_components/ResizerCustom";
import { VideoComponent } from "./_editor_component/EditorVideo";
import { ImageComponent, ImageInner } from "./_editor_component/EditorImage";
import ResizeWrapper from "./_editor_component/ResizeWrapper";
import { Grid } from "./_editor_component/EditorGrid";
import { FlexContainer } from "./_editor_component/EditorFlex";
import { ParagraphComponent } from "./_editor_component/EditorParagraph";
export default function layout({children}:{
  children:any
}) {
    return (
        <Editor
        
        resolver={{
            Text,
            EditorBtn,
            Container,
            VideoComponent,
            ImageComponent,
            Grid,
            FlexContainer,
            ParagraphComponent,
            ResizeWrapper,
            ResizerCustom,
            ImageInner
            // Inner
          }}

        >
           {children}
        </Editor>
    );
}
