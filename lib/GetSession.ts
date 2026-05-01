import { getSessionId } from "./GetCookie";

export default async function GetSession(): Promise<string | null> {
  return getSessionId();
}