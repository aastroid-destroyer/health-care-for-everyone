"use client"

import { useState, useEffect, useCallback } from "react"
import {
  saveMentalCheckin,
  getMentalCheckins,
  saveAppointment,
  getAppointments,
  saveHealthMetric,
  getHealthMetrics,
  initDB,
} from "@/lib/storage"
import { syncData, setupAutoSync } from "@/lib/sync"

export function useStorage() {
  const [isReady, setIsReady] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    async function init() {
      try {
        await initDB()
        setupAutoSync()
        setIsReady(true)
      } catch (error) {
        console.error("[v0] Storage initialization failed:", error)
      }
    }

    init()
  }, [])

  const addMentalCheckin = useCallback(
    async (data) => {
      if (!isReady) throw new Error("Storage not ready")
      return await saveMentalCheckin(data)
    },
    [isReady],
  )

  const fetchMentalCheckins = useCallback(async () => {
    if (!isReady) throw new Error("Storage not ready")
    return await getMentalCheckins()
  }, [isReady])

  const addAppointment = useCallback(
    async (data) => {
      if (!isReady) throw new Error("Storage not ready")
      return await saveAppointment(data)
    },
    [isReady],
  )

  const fetchAppointments = useCallback(async () => {
    if (!isReady) throw new Error("Storage not ready")
    return await getAppointments()
  }, [isReady])

  const addHealthMetric = useCallback(
    async (data) => {
      if (!isReady) throw new Error("Storage not ready")
      return await saveHealthMetric(data)
    },
    [isReady],
  )

  const fetchHealthMetrics = useCallback(async () => {
    if (!isReady) throw new Error("Storage not ready")
    return await getHealthMetrics()
  }, [isReady])

  const performSync = useCallback(async () => {
    setIsSyncing(true)
    try {
      return await syncData()
    } finally {
      setIsSyncing(false)
    }
  }, [])

  return {
    isReady,
    isSyncing,
    addMentalCheckin,
    fetchMentalCheckins,
    addAppointment,
    fetchAppointments,
    addHealthMetric,
    fetchHealthMetrics,
    performSync,
  }
}
