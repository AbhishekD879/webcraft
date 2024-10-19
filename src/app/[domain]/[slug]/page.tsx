// 'use client'
// import { eq } from 'drizzle-orm';
// import db from '@/lib/drizzle';
// import { sites, siteStateTable } from '@/lib/schema';
// import { notFound } from 'next/navigation';
// import { headers } from 'next/headers';
// import { Editor, Frame } from "@craftjs/core";
// import ReactDOMServer from 'react-dom/server';

// // Import user components
// import { Button as EditorBtn } from "../../(main)/editor/[slug]/_editor_component/Button";
// import { Text } from "../../(main)/editor/[slug]/_editor_component/Text";
// import Container from "../../(main)/editor/[slug]/_editor_component/Container";
// import { VideoComponent } from "../../(main)/editor/[slug]/_editor_component/EditorVideo";
// import { ImageComponent } from "../../(main)/editor/[slug]/_editor_component/EditorImage";
// import ResizeWrapper from "../../(main)/editor/[slug]/_editor_component/ResizeWrapper";
// import { Grid } from "../../(main)/editor/[slug]/_editor_component/EditorGrid";
// import { FlexContainer } from "../../(main)/editor/[slug]/_editor_component/EditorFlex";
// import { ParagraphComponent } from "../../(main)/editor/[slug]/_editor_component/EditorParagraph";
// import { InlineTextComponent } from "../../(main)/editor/[slug]/_editor_component/EditorText";
// import ResizerCustom from "../../(main)/editor/[slug]/_components/ResizerCustom";

// interface PageProps {
//   params: {
//     domain: string;
//     slug: string;
//   };
// }

// const userComponents = {
//   Text,
//   EditorBtn,
//   Container,
//   VideoComponent,
//   ImageComponent,
//   Grid,
//   FlexContainer,
//   ParagraphComponent,
//   ResizeWrapper,
//   ResizerCustom,
//   InlineTextComponent,
// };

// function renderMarkup(JSONStateString: string) {
//   return ReactDOMServer.renderToStaticMarkup(
//     <Editor enabled={false} resolver={userComponents}>
//       <Frame json={JSONStateString} />
//     </Editor>
//   );
// }

// export default async function DomainPage({ params }: PageProps) {
//   const { domain, slug } = params;
  
//   const headersList = headers();
//   const host = headersList.get('host') || '';

//   const siteIdentifier = host.includes('localhost') ? domain : host;
//   const trimmedIdentifier = siteIdentifier.trim();

//   const site = await db.select()
//     .from(sites)
//     .where(eq(sites.subdomain, trimmedIdentifier))
//     .limit(1)
//     .then(results => results[0]);

//   if (!site) {
//     notFound();
//   }

//   // Fetch PublishedJsonState from siteStateTable
//   const siteState = await db.select({ publishedJsonState: siteStateTable.PublishedJsonState })
//     .from(siteStateTable)
//     .where(eq(siteStateTable.siteId, site.id))
//     .limit(1)
//     .then(results => results[0]);

//   if (!siteState || !siteState.publishedJsonState) {
//     return <div>No published content available.</div>;
//   }

//   const renderedMarkup = renderMarkup(siteState.publishedJsonState);

//   return (
//     <div>
//       <div dangerouslySetInnerHTML={{ __html: renderedMarkup }} />
//     </div>
//   );
// }

export default function Page(){
    return (<div>Hi From Page Slug</div>)
}