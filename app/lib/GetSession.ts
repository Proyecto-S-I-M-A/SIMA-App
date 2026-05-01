export default function GetSession() {
  if (typeof window === 'undefined') {
    return null;
  }
  return sessionStorage.getItem('sessionID');
}