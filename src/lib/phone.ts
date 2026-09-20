export function normalizePakistanMobile(input: string): string | null {
  const cleaned = input.trim().replace(/[\s()-]/g, "");

  let phone = cleaned;

  if (/^03\d{9}$/.test(cleaned)) {
    phone = `+92${cleaned.slice(1)}`;
  } else if (/^923\d{9}$/.test(cleaned)) {
    phone = `+${cleaned}`;
  } else if (/^00923\d{9}$/.test(cleaned)) {
    phone = `+${cleaned.slice(2)}`;
  }

  return /^\+923\d{9}$/.test(phone) ? phone : null;
}