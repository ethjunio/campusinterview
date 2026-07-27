"use server";

import { revalidatePath } from "next/cache";

export async function revalidateInterviewBrandPages() {
  revalidatePath("/", "layout");
}
