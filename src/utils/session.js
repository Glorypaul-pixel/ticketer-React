export const SESSION_KEY = "ticketapp_session";

export function setSession(token, user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }));
}
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (e) {
    console.log(e);
    
    return null;
  }
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
