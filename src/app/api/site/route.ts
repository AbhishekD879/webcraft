import db from "@/lib/drizzle";
import { sites } from "@/lib/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
export async function GET() {
  const user = await currentUser();
  const data = await db.select().from(sites).where(eq(sites.userId, user?.id!));
  
  return Response.json({ data });
}
