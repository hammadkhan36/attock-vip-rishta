"use client";

import { useActionState, useState } from "react";
import { saveContact } from "./contact-actions";

export default function ContactForm({
  initialPhone = "",
}: {
  initialPhone?: string;
}) {
  const [phone, setPhone] = useState(initialPhone);

  const [state, formAction, pending] = useActionState(saveContact, {
    error: "",
    success: "",
  });

  return (
    <form action={formAction} className="auth-form">
      <label htmlFor="phone">Mobile number *</label>

      <input
        id="phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="03001234567"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        maxLength={30}
        required
        readOnly={pending}
        aria-invalid={Boolean(state.error)}
        aria-describedby="phone-help phone-message"
      />

      <small id="phone-help">
        Your number is required so our team can call you for verification
        when needed. It will not appear on your public profile.
      </small>

      <button
        type="submit"
        className="button button-primary"
        disabled={pending}
      >
        {pending ? "Saving..." : "Save mobile number"}
      </button>

      <p
        id="phone-message"
        role="status"
        aria-live="polite"
        className="auth-message"
      >
        {state.error || state.success}
      </p>
    </form>
  );
}