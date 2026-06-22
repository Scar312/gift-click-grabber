import { useEffect, useState } from "react";

export type User = {
  id: string;
  accountId: string;
  fullName: string;
  email: string;
  phone?: string;
  rank?: string;
  createdAt: string;
};

const KEY_USERS = "thv.users";
const KEY_SESSION = "thv.session";

function load<T>(k: string, fb: T): T {
  if (typeof window === "undefined") return fb;
  try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return fb; }
}
function save(k: string, v: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
}
function genAccountId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `THV-${n}`;
}

export const auth = {
  current(): User | null {
    return load<User | null>(KEY_SESSION, null);
  },
  signup(input: { fullName: string; email: string; password: string; phone?: string }): User {
    const users = load<(User & { password: string })[]>(KEY_USERS, []);
    if (users.find((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const user: User & { password: string } = {
      id: crypto.randomUUID(),
      accountId: genAccountId(),
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      createdAt: new Date().toISOString(),
      password: input.password,
    };
    users.push(user);
    save(KEY_USERS, users);
    const { password: _p, ...session } = user;
    save(KEY_SESSION, session);
    window.dispatchEvent(new Event("thv-auth"));
    return session;
  },
  login(email: string, password: string): User {
    const users = load<(User & { password: string })[]>(KEY_USERS, []);
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
    if (!u) throw new Error("Invalid email or password.");
    const { password: _p, ...session } = u;
    save(KEY_SESSION, session);
    window.dispatchEvent(new Event("thv-auth"));
    return session;
  },
  logout() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEY_SESSION);
    window.dispatchEvent(new Event("thv-auth"));
  },
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser(auth.current());
    const h = () => setUser(auth.current());
    window.addEventListener("thv-auth", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("thv-auth", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return user;
}