import { AUTH_KEY } from "../constants/gameConstants";
import type { AuthUser } from "../types/gameTypes";

export function loginAsGuest() {
    const guestUser: AuthUser = {
        id: `guest-${crypto.randomUUID()}`,
        type: "guest",
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(guestUser));

    return guestUser;
}
