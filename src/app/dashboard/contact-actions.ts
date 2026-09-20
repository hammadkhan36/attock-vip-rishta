"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { normalizePakistanMobile } from "@/lib/phone";

type ContactState = {
  error: string;
  success: string;
};

export async function saveContact(
  _previousState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const rawPhone = formData.get("phone");

  if (typeof rawPhone !== "string" || rawPhone.length > 30) {
    return { error: "Please enter a valid mobile number.", success: "" };
  }

  const phone = normalizePakistanMobile(rawPhone);

  if (!phone) {
    return {
      error: "Enter a Pakistani mobile number, for example 03001234567.",
      success: "",
    };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        error: "Your session has expired. Please log in again.",
        success: "",
      };
    }

    const { data: existing, error: readError } = await supabase
      .from("member_contacts")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (readError) {
      return {
        error: "Unable to load your contact details. Please try again.",
        success: "",
      };
    }

    // The account ID comes from the verified session, never from the form.
    const result = existing
      ? await supabase
          .from("member_contacts")
          .update({ phone })
          .eq("user_id", user.id)
          .select("user_id")
          .single()
      : await supabase
          .from("member_contacts")
          .insert({ user_id: user.id, phone })
          .select("user_id")
          .single();

    if (result.error) {
      return {
        error: "Unable to save your number. Please try again.",
        success: "",
      };
    }
  } catch {
    return {
      error: "Unable to connect. Please try again.",
      success: "",
    };
  }

  revalidatePath("/dashboard");

  return {
    error: "",
    success: "Your mobile number has been saved.",
  };
}