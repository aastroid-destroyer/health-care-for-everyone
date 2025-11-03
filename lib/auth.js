import { saveUserProfile, getUserProfile } from "./storage"

const AUTH_KEY = "shastho_auth_token"
const SESSION_KEY = "shastho_session"

export function generateToken() {
  return Math.random().toString(36).substr(2) + Date.now().toString(36)
}

export async function registerUser(userData) {
  const userId = "user_" + Date.now()
  const token = generateToken()

  const user = {
    userId,
    ...userData,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }

  await saveUserProfile(userId, user)

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, token)
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId, token }))
  }

  return { success: true, user, token }
}

export async function loginUser(email, password) {
  // In production, this would validate against a backend
  // For now, we'll create a local session
  const userId = "user_" + email.replace(/[^a-zA-Z0-9]/g, "_")
  const token = generateToken()

  const user = await getUserProfile(userId)

  if (!user) {
    return { success: false, error: "User not found" }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, token)
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId, token }))
  }

  return { success: true, user, token }
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(SESSION_KEY)
  }
  return { success: true }
}

export function getSession() {
  if (typeof window === "undefined") return null

  const session = localStorage.getItem(SESSION_KEY)
  const token = localStorage.getItem(AUTH_KEY)

  if (!session || !token) return null

  try {
    return JSON.parse(session)
  } catch {
    return null
  }
}

export async function getCurrentUser() {
  const session = getSession()
  if (!session) return null

  const user = await getUserProfile(session.userId)
  return user
}

export function isAuthenticated() {
  return getSession() !== null
}

export async function updateUserProfile(userId, updates) {
  const user = await getUserProfile(userId)
  if (!user) return { success: false, error: "User not found" }

  const updated = {
    ...user,
    ...updates,
    lastUpdated: new Date().toISOString(),
  }

  await saveUserProfile(userId, updated)
  return { success: true, user: updated }
}
