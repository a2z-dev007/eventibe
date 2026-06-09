"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { loginApi } from "@/services/api"

export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  mobile: string
  profile_image: string | null
  permissions: string[]
  role_id: string
  is_superuser: boolean
  user_type: string
  city_id: number | null
  region_id: number | null
  address_line1: string | null
  address_line2: string | null
  country_id: number | null
  company_name: string | null
  secondary_phone_ext: string | null
  city: string | null
  secondary_phone: string | null
  gender: string | null
  languages_spoken: string | null
  language: string
  about_me: string | null
  hometown: string | null
  school: string | null
  created_at: string
  region: string | null
  country: string | null
  pin_code: string | null
  latitude: number | null
  longitude: number | null
  office: string | null
  parent: string | null
  status: boolean
  status_remark: string | null
  role_name: string
  full_name: string
  url: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (credentials: { email: string; password: string }) => Promise<User>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const userRaw = localStorage.getItem("spodia_user")
        const accessToken = localStorage.getItem("spodia_access_token")

        if (userRaw && accessToken) {
          setUser(JSON.parse(userRaw))
        }
      } catch (err) {
        console.error("Error initializing auth:", err)
        // Clear corrupted storage
        localStorage.removeItem("spodia_user")
        localStorage.removeItem("spodia_access_token")
        localStorage.removeItem("spodia_refresh_token")
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await loginApi(credentials)
      const { user: apiUser, access, refresh } = response.data

      // Store in local storage
      localStorage.setItem("spodia_access_token", access)
      localStorage.setItem("spodia_refresh_token", refresh)
      localStorage.setItem("spodia_user", JSON.stringify(apiUser))

      setUser(apiUser)
      setIsLoading(false)
      return apiUser
    } catch (err: any) {
      setIsLoading(false)
      let errorMessage = "Login failed. Please check your credentials."

      if (err.response) {
        const status = err.response.status
        const data = err.response.data
        const apiErrorMessage = data?.detail || data?.message || data?.error

        switch (status) {
          case 400:
            errorMessage = apiErrorMessage || "Invalid request. Please check your input."
            break
          case 401:
            if (apiErrorMessage?.toLowerCase().includes("no active account")) {
              errorMessage = "No active account found with the given credentials. Please check your email and password."
            } else {
              errorMessage = apiErrorMessage || "Invalid credentials. Please check your email and password."
            }
            break
          case 403:
            errorMessage = apiErrorMessage || "Account access denied. Please contact support."
            break
          case 404:
            errorMessage = apiErrorMessage || "Account not found. Please check your email or sign up."
            break
          case 429:
            errorMessage = apiErrorMessage || "Too many login attempts. Please try again later."
            break
          case 500:
            errorMessage = "Server error. Please try again later."
            break
          default:
            errorMessage = apiErrorMessage || `Login failed (${status}). Please try again.`
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your internet connection."
      } else {
        errorMessage = err.message || "An unexpected error occurred."
      }

      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const logout = () => {
    localStorage.removeItem("spodia_user")
    localStorage.removeItem("spodia_access_token")
    localStorage.removeItem("spodia_refresh_token")
    setUser(null)
    setError(null)
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
