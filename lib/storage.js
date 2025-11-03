const DB_NAME = "ShasthoShebaDB"
const DB_VERSION = 1

const STORES = {
  mentalCheckins: "mental_checkins",
  appointments: "appointments",
  healthMetrics: "health_metrics",
  userProfile: "user_profile",
  volunteersCache: "volunteers_cache",
}

let db = null

// Initialize IndexedDB
export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      db = event.target.result

      // Create object stores
      if (!db.objectStoreNames.contains(STORES.mentalCheckins)) {
        const store = db.createObjectStore(STORES.mentalCheckins, { keyPath: "id", autoIncrement: true })
        store.createIndex("date", "date", { unique: false })
        store.createIndex("synced", "synced", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.appointments)) {
        const store = db.createObjectStore(STORES.appointments, { keyPath: "id", autoIncrement: true })
        store.createIndex("date", "appointmentDate", { unique: false })
        store.createIndex("synced", "synced", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.healthMetrics)) {
        const store = db.createObjectStore(STORES.healthMetrics, { keyPath: "id", autoIncrement: true })
        store.createIndex("date", "date", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.userProfile)) {
        db.createObjectStore(STORES.userProfile, { keyPath: "userId" })
      }

      if (!db.objectStoreNames.contains(STORES.volunteersCache)) {
        db.createObjectStore(STORES.volunteersCache, { keyPath: "id" })
      }
    }
  })
}

// Save mental check-in
export async function saveMentalCheckin(data) {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.mentalCheckins], "readwrite")
    const store = transaction.objectStore(STORES.mentalCheckins)
    const request = store.add({
      ...data,
      date: new Date().toISOString(),
      synced: false,
    })
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

// Get all mental check-ins
export async function getMentalCheckins() {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.mentalCheckins], "readonly")
    const store = transaction.objectStore(STORES.mentalCheckins)
    const index = store.index("date")
    const request = index.getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result.reverse())
  })
}

// Save appointment
export async function saveAppointment(data) {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.appointments], "readwrite")
    const store = transaction.objectStore(STORES.appointments)
    const request = store.add({
      ...data,
      synced: false,
    })
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

// Get all appointments
export async function getAppointments() {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.appointments], "readonly")
    const store = transaction.objectStore(STORES.appointments)
    const request = store.getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

// Save health metrics
export async function saveHealthMetric(data) {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.healthMetrics], "readwrite")
    const store = transaction.objectStore(STORES.healthMetrics)
    const request = store.add({
      ...data,
      date: new Date().toISOString(),
    })
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

// Get health metrics
export async function getHealthMetrics() {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.healthMetrics], "readonly")
    const store = transaction.objectStore(STORES.healthMetrics)
    const request = store.getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

// Save user profile
export async function saveUserProfile(userId, data) {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.userProfile], "readwrite")
    const store = transaction.objectStore(STORES.userProfile)
    const request = store.put({
      userId,
      ...data,
      lastUpdated: new Date().toISOString(),
    })
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

// Get user profile
export async function getUserProfile(userId) {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.userProfile], "readonly")
    const store = transaction.objectStore(STORES.userProfile)
    const request = store.get(userId)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

// Get unsync ed items
export async function getUnsyncedItems() {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.mentalCheckins, STORES.appointments], "readonly")

    const mentalStore = transaction.objectStore(STORES.mentalCheckins)
    const appointmentStore = transaction.objectStore(STORES.appointments)

    const mentalIndex = mentalStore.index("synced")
    const appointmentIndex = appointmentStore.index("synced")

    const mentalRequest = mentalIndex.getAll(false)
    const appointmentRequest = appointmentIndex.getAll(false)

    let mentalData = []
    let appointmentData = []
    let completed = 0

    mentalRequest.onerror = () => reject(mentalRequest.error)
    mentalRequest.onsuccess = () => {
      mentalData = mentalRequest.result
      completed++
      if (completed === 2) resolve({ mental: mentalData, appointments: appointmentData })
    }

    appointmentRequest.onerror = () => reject(appointmentRequest.error)
    appointmentRequest.onsuccess = () => {
      appointmentData = appointmentRequest.result
      completed++
      if (completed === 2) resolve({ mental: mentalData, appointments: appointmentData })
    }
  })
}

// Mark item as synced
export async function markAsSynced(storeName, id) {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite")
    const store = transaction.objectStore(storeName)
    const getRequest = store.get(id)

    getRequest.onsuccess = () => {
      const data = getRequest.result
      if (data) {
        data.synced = true
        const updateRequest = store.put(data)
        updateRequest.onerror = () => reject(updateRequest.error)
        updateRequest.onsuccess = () => resolve(true)
      }
    }
    getRequest.onerror = () => reject(getRequest.error)
  })
}

// Clear old data (for cache management)
export async function clearOldData(storeName, daysOld = 30) {
  if (!db) await initDB()
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysOld)

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite")
    const store = transaction.objectStore(storeName)
    const request = store.getAll()

    request.onsuccess = () => {
      const items = request.result
      let deleted = 0

      items.forEach((item) => {
        if (item.date && new Date(item.date) < cutoffDate) {
          store.delete(item.id)
          deleted++
        }
      })

      resolve(deleted)
    }
    request.onerror = () => reject(request.error)
  })
}
