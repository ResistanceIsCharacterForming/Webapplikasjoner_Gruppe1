/* Code is straight form ulearn for testing, will be refactored */

import {
  hashPassword as hash,
  verifyPassword as verify,
} from "better-auth/crypto"

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await verify({
      password,
      hash,
    });
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}