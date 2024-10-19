'use client'
import { Button as EditorBtn } from "../../(main)/editor/[slug]/_editor_component/Button";
import ResizerCustom from "@/app/(main)/editor/[slug]/_components/ResizerCustom";
import Container from "@/app/(main)/editor/[slug]/_editor_component/Container";
import { FlexContainer } from "@/app/(main)/editor/[slug]/_editor_component/EditorFlex";
import { Grid } from "@/app/(main)/editor/[slug]/_editor_component/EditorGrid";
import { ImageComponent } from "@/app/(main)/editor/[slug]/_editor_component/EditorImage";
import { ParagraphComponent } from "@/app/(main)/editor/[slug]/_editor_component/EditorParagraph";
import { InlineTextComponent } from "@/app/(main)/editor/[slug]/_editor_component/EditorText";
import { VideoComponent } from "@/app/(main)/editor/[slug]/_editor_component/EditorVideo";
import ResizeWrapper from "@/app/(main)/editor/[slug]/_editor_component/ResizeWrapper";
import { Text } from "@/app/(main)/editor/[slug]/_editor_component/Text";
import { Editor, Frame } from "@craftjs/core";
import ReactDOMServer from 'react-dom/server';

const userComponents = {
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
    InlineTextComponent,
  };

function renderMarkup(JSONStateString:string) {
    return ReactDOMServer.renderToStaticMarkup(<Editor enabled={false} resolver={userComponents}>
      <Frame json={JSONStateString} />
    </Editor>);
  }

export default function EditorDomian({json}:{
    json:any
}) {
    return (
        <div dangerouslySetInnerHTML={{ __html: renderMarkup(json) }}>
        </div>
    );
}