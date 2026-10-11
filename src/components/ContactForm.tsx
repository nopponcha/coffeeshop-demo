"use client";

import {
  CONTACT_LIMITS,
  sanitizeContactFields,
  validateContactFields,
  type ContactFieldErrors,
} from "@/lib/contactValidation";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);

    const sanitized = sanitizeContactFields({ name, email, message });
    setName(sanitized.name);
    setEmail(sanitized.email);
    setMessage(sanitized.message);

    const nextErrors = validateContactFields(sanitized);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  }

  return (
    <div className="contact-card">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className={`form-field${errors.name ? " form-field--invalid" : ""}`}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.nameMax}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name ? (
            <p className="form-error" id="contact-name-error" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={`form-field${errors.email ? " form-field--invalid" : ""}`}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.emailMax}
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email ? (
            <p className="form-error" id="contact-email-error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={`form-field${errors.message ? " form-field--invalid" : ""}`}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={CONTACT_LIMITS.messageMax}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
          />
          {errors.message ? (
            <p className="form-error" id="contact-message-error" role="alert">
              {errors.message}
            </p>
          ) : null}
        </div>

        <button type="submit" className="button-primary">
          Send
        </button>

        {success ? (
          <p className="form-success" role="status">
            Thanks, we&apos;ll be in touch!
          </p>
        ) : null}
      </form>
    </div>
  );
}
