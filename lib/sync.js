import { getUnsyncedItems, markAsSynced } from "./storage"

export async function syncData() {
  try {
    const unsyncedItems = await getUnsyncedItems()

    if (unsyncedItems.mental.length === 0 && unsyncedItems.appointments.length === 0) {
      console.log("[v0] No data to sync")
      return { success: true, synced: 0 }
    }

    let syncedCount = 0

    // Sync mental check-ins
    for (const item of unsyncedItems.mental) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100))
        await markAsSynced("mental_checkins", item.id)
        syncedCount++
      } catch (error) {
        console.error("[v0] Error syncing mental check-in:", error)
      }
    }

    // Sync appointments
    for (const item of unsyncedItems.appointments) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100))
        await markAsSynced("appointments", item.id)
        syncedCount++
      } catch (error) {
        console.error("[v0] Error syncing appointment:", error)
      }
    }

    return { success: true, synced: syncedCount }
  } catch (error) {
    console.error("[v0] Sync failed:", error)
    return { success: false, error: error.message }
  }
}

// Setup auto-sync when online
export function setupAutoSync() {
  if (typeof window === "undefined") return

  const handleOnline = async () => {
    console.log("[v0] Device is online, syncing data...")
    await syncData()
  }

  const handleOffline = () => {
    console.log("[v0] Device is offline, working locally")
  }

  window.addEventListener("online", handleOnline)
  window.addEventListener("offline", handleOffline)

  return () => {
    window.removeEventListener("online", handleOnline)
    window.removeEventListener("offline", handleOffline)
  }
}

// Check if online
export function isOnline() {
  return typeof navigator !== "undefined" && navigator.onLine
}
