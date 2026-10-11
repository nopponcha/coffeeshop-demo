/** Limits and validation for untrusted contact form input (client-side demo). */

export const CONTACT_LIMITS = {
  nameMax: 100,
  emailMax: 254,
  messageMax: 2000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strip control chars except common whitespace; never interpret as HTML. */
export function normalizeContactText(value: string, allowNewlines = false): string {
  let out = "";
  for (const char of value) {
    const code = char.charCodeAt(0);
    if (code === 9 || code === 10 || code === 13) {
      if (allowNewlines && (code === 10 || code === 13)) {
        out += "\n";
      }
      continue;
    }
    if (code < 32 || code === 127) {
      continue;
    }
    out += char;
  }
  return out.trim();
}

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactFieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function sanitizeContactFields(raw: ContactFields): ContactFields {
  return {
    name: normalizeContactText(raw.name).slice(0, CONTACT_LIMITS.nameMax),
    email: normalizeContactText(raw.email).slice(0, CONTACT_LIMITS.emailMax),
    message: normalizeContactText(raw.message, true).slice(
      0,
      CONTACT_LIMITS.messageMax,
    ),
  };
}

export function validateContactFields(fields: ContactFields): ContactFieldErrors {
  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim();
  const errors: ContactFieldErrors = {};

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Name must be ${CONTACT_LIMITS.nameMax} characters or fewer.`;
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (email.length > CONTACT_LIMITS.emailMax) {
    errors.email = `Email must be ${CONTACT_LIMITS.emailMax} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer.`;
  }

  return errors;
}
