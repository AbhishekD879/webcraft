import db from "@/lib/drizzle";
import { siteStateTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

// Utility function for error responses
const errorResponse = (message: string, status: number) => {
  return Response.json({ error: message }, { status });
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const site = searchParams.get('site');
    if (!site) {
      return errorResponse("Invalid site parameter", 400);
    }
    const data = await db
      .selectDistinct()
      .from(siteStateTable)
      .where(eq(siteStateTable.siteId, site));
    return Response.json({ data });
  } catch (error) {
    console.error("GET error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const site = searchParams.get('site');
    if (!site) {
      return errorResponse("Invalid site parameter", 400);
    }

    const body = await req.json();
    const { savedJsonState, publishedJsonState } = body;

    if (!savedJsonState || !publishedJsonState) {
      return errorResponse("Missing required fields", 400);
    }

    // Check if the record exists
    const existingRecord = await db
      .select()
      .from(siteStateTable)
      .where(eq(siteStateTable.siteId, site))
      .limit(1);

    if (existingRecord.length > 0) {
      // Update existing record
      await db.update(siteStateTable)
        .set({
          savedJsonState,
          PublishedJsonState: publishedJsonState,
        })
        .where(eq(siteStateTable.siteId, site));
    } else {
      // Insert new record
      await db.insert(siteStateTable).values({
        siteId: site,
        savedJsonState,
        PublishedJsonState: publishedJsonState,
      });
    }

    return Response.json({
      data: { message: "Site state saved successfully", success: true },
    });
  } catch (error) {
    console.error("POST error:", error);
    return errorResponse("Internal server error", 500);
  }
}
