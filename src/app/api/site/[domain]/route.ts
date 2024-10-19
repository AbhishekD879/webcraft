import { eq } from "drizzle-orm";
import db from "@/lib/drizzle";
import { sites, siteStateTable } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { domain: string } }
) {
  const { domain } = params;
  console.log("Fetching site data for:", domain);
  try {
    const site = await db
      .select()
      .from(sites)
      .where(eq(sites.subdomain, domain))
      .limit(1)
      .then((results) => results[0]);

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    console.log("fetched site data", site);

    const siteState = await db
      .select({ publishedJsonState: siteStateTable.PublishedJsonState })
      .from(siteStateTable)
      .where(eq(siteStateTable.siteId, site.id))
      .limit(1)
      .then((results) => results[0]);
    console.log("fetched siteState", siteState);
    return NextResponse.json({
      site,
      publishedJsonState: siteState?.publishedJsonState,
    });
  } catch (error) {
    console.error("Error fetching site data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
