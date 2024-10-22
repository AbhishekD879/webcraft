"use server";
import db  from "@/lib/drizzle";
import { sites } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";
// import {} from "uuid"
const returnObject = {
  success: false,
};
export const createSite = async (
  pre: any,
  formData: FormData
): Promise<typeof returnObject> => {
  // Implement server-side logic to create a new site using the provided form data.
  // Return the created site object.
  // Example:
  // const newSite = await createNewSite(pre, formData);
  // return newSite;
  try {
    const siteName = formData.get("site-name") as string;
    const subdomain = formData.get("subdomain") as string;
    const userId = formData.get("userId") as string;
    const host = headers().get("host");
    console.log("SiteName", siteName);
    console.log("Subdomain", subdomain);
    console.log("UserId", userId);
    
    const row  = await db.insert(sites).values({
      id: uuidv4(),
      name: siteName,
      userId: userId,
      subdomain: subdomain,
      url: `http://${subdomain}.${host}`,
    });
    returnObject.success = true;
    revalidatePath("/dashboard")
    return returnObject;
  } catch (e: any) {
    console.error("Error creating site", e);
    returnObject.success = false;
    return returnObject;
  }
};
