import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ContactForm from "./contact-form";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "My Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: contact, error: contactError } = await supabase
    .from("member_contacts")
    .select("phone")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Link href="/" className="footer-brand">
          Attock VIP Rishta
        </Link>

        <h1>Your dashboard.</h1>
        <p>Signed in as {user.email}</p>

        {contactError ? (
          <p role="alert">
            We could not load your contact details. Please refresh this page
            and try again.
          </p>
        ) : (
          <>
            <h2 style={{ fontSize: "28px" }}>
              {contact ? "Your contact details" : "Add your mobile number"}
            </h2>

            <p>
              {contact
                ? "Your number is saved privately. You can update it below."
                : "Please add your mobile number before creating your rishta profile."}
            </p>

            <ContactForm initialPhone={contact?.phone ?? ""} />

            {contact && (
              <div className="dashboard-notice">
                <strong>Contact details saved</strong>
                <p>
                  Saving a number does not verify it. Our team may contact
                  you when a verification check is needed.
                </p>
                <p>The rishta profile form will be added next.</p>
              </div>
            )}
          </>
        )}

        <form action={logout} style={{ marginTop: "24px" }}>
          <button type="submit" className="button button-secondary">
            Log out
          </button>
        </form>
      </section>
    </main>
  );
}