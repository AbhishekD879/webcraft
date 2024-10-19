import db from '@/lib/drizzle';
import { sites, siteStateTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { notFound, useParams } from 'next/navigation';
import EditorDomian from './_domainEditor/EditorDomian';




interface PageProps {
  params: {
    domain: string;
    slug: string;
  };
}


export default async function DomainPage({ params }: PageProps) {
  const { domain, slug } = params;
  
  const headersList = headers();
  const host = headersList.get('host') || '';

  const siteIdentifier = host.includes('localhost') ? domain : host.split(".")[0];
  const trimmedIdentifier = siteIdentifier.trim();

  const site = await db.select()
    .from(sites)
    .where(eq(sites.subdomain, trimmedIdentifier))
    .limit(1)
    .then(results => results[0]);

  if (!site) {
    notFound();
  }

  // Fetch PublishedJsonState from siteStateTable
  const siteState = await db.select({ publishedJsonState: siteStateTable.PublishedJsonState,json:siteStateTable.savedJsonState })
    .from(siteStateTable)
    .where(eq(siteStateTable.siteId, site.id))
    .limit(1)
    .then(results => results[0]);

  if (!siteState || !siteState.publishedJsonState) {
    return <div>No published content available.</div>;
  }

  return (
    <div>
      <EditorDomian json={siteState.json}/>
    </div>
  );
}
