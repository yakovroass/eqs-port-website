import crypto from "crypto";

const ENV_KEY = "KNOWN_PASSWORD_ENC_KEY";

function getKeyBytes(): Buffer | null {
  const raw = process.env[ENV_KEY];
  if (!raw) return null;
  // Accept:
  // - 64 hex chars (32 bytes)
  // - base64 of 32 bytes
  const hex = raw.trim();
  if (/^[0-9a-fA-F]{64}$/.test(hex)) return Buffer.from(hex, "hex");
  try {
    const b = Buffer.from(hex, "base64");
    if (b.length === 32) return b;
  } catch {
    // ignore
  }
  return null;
}

export function canStoreKnownPasswords(): boolean {
  return true;
}

// Format: v1:<b64(iv)>.<b64(tag)>.<b64(ciphertext)>
export function encryptKnownPassword(plain: string): string | null {
  const key = getKeyBytes();
  if (!key) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString("base64")}.${tag.toString("base64")}.${ciphertext.toString("base64")}`;
}

export function decryptKnownPassword(payload: string): string | null {
  const key = getKeyBytes();
  if (!key) return null;
  const trimmed = payload.trim();
  if (!trimmed.startsWith("v1:")) return null;
  const parts = trimmed.slice(3).split(".");
  if (parts.length !== 3) return null;
  const [ivB64, tagB64, ctB64] = parts;
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const ct = Buffer.from(ctB64, "base64");
  if (iv.length !== 12 || tag.length !== 16) return null;
  try {
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
    return plain.toString("utf8");
  } catch {
    return null;
  }
}

const PLAIN1_PREFIX = "plain1:";

/**
 * Always persists something in DB so admin can see passwords on any device (mobile has no localStorage).
 * Prefer AES when KNOWN_PASSWORD_ENC_KEY is set; otherwise base64 "plain1:" fallback (still admin-only API).
 */
export function encodeKnownPasswordForAdmin(plain: string): string {
  const enc = encryptKnownPassword(plain);
  if (enc) return enc;
  return `${PLAIN1_PREFIX}${Buffer.from(plain, "utf8").toString("base64")}`;
}

export function decodeKnownPasswordForAdmin(payload: string | null | undefined): string | null {
  if (!payload) return null;
  const t = payload.trim();
  if (t.startsWith(PLAIN1_PREFIX)) {
    try {
      return Buffer.from(t.slice(PLAIN1_PREFIX.length), "base64").toString("utf8");
    } catch {
      return null;
    }
  }
  return decryptKnownPassword(t);
}

