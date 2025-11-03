"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudOff } from "lucide-react"
import { isOnline } from "@/lib/sync"

export function SyncStatus() {
  const [online, setOnline] = useState(true)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    setOnline(isOnline())

    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-lg">
      {online ? (
        <>
          <Cloud className="h-4 w-4 text-green-600" />
          <span className="text-xs font-medium">Online</span>
        </>
      ) : (
        <>
          <CloudOff className="h-4 w-4 text-amber-600" />
          <span className="text-xs font-medium">Offline</span>
        </>
      )}
    </div>
  )
}
