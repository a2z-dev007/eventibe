"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/AuthContext"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import logoImg from "@/assets/images/logo.png"
import { toast } from "sonner"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [rateLimitTimer, setRateLimitTimer] = useState(0)
  const router = useRouter()
  const { login, isLoading, error, clearError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Clear error when component mounts
  useEffect(() => {
    clearError()
  }, [])

  // Rate limiting effect
  useEffect(() => {
    if (rateLimitTimer > 0) {
      const timer = setTimeout(() => {
        setRateLimitTimer(rateLimitTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isRateLimited && rateLimitTimer === 0) {
      setIsRateLimited(false)
      setAttemptCount(0)
    }
  }, [rateLimitTimer, isRateLimited])

  // Handle rate limiting
  const handleRateLimit = () => {
    const newAttemptCount = attemptCount + 1
    setAttemptCount(newAttemptCount)

    if (newAttemptCount >= 3) {
      setIsRateLimited(true)
      setRateLimitTimer(60) 
      toast.error("Too Many Attempts", {
        description: "Please wait 60 seconds before trying again.",
      })
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    if (isRateLimited) return

    try {
      clearError()
      const sanitizedEmail = data.email.trim().toLowerCase()
      const sanitizedPassword = data.password.trim()

      await login({
        email: sanitizedEmail,
        password: sanitizedPassword
      })

      setAttemptCount(0)
      setIsRateLimited(false)
      toast.success("Welcome back!", {
        description: "You have successfully logged in."
      })
      router.push("/dashboard")
    } catch (err: any) {
      handleRateLimit()
    }
  }

  return (
    <div className="w-full">
      <div className="text-center flex flex-col items-center mb-8">
        <div className="relative w-36 h-12 mb-4">
          <Image
            src={logoImg}
            alt="Eventibe Logo"
            fill
            sizes="(max-width: 144px) 100vw, 144px"
            className="object-contain brightness-0 invert opacity-95 drop-shadow-md"
            priority
          />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-white/70 font-medium text-sm">Sign in to your Eventibe account</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-2xl p-4 mb-6 flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-400 text-sm font-bold">Login Error</p>
            <p className="text-red-300 text-xs mt-1 leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {isRateLimited && (
        <div className="bg-amber-500/10 border border-amber-500/20 backdrop-blur-md rounded-2xl p-4 mb-6 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-amber-400 text-sm font-bold">Too Many Attempts</p>
            <p className="text-amber-300 text-xs mt-1">
              Please wait {rateLimitTimer} seconds before trying again.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="space-y-2 group">
          <label className="text-sm font-bold text-white/95 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-white/40 group-focus-within:text-accent-orange transition-colors" />
            <Input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className={`pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-accent-orange/20 focus-visible:border-accent-orange focus:border-accent-orange transition-all rounded-xl w-full ${
                errors.email ? "border-red-400/50 focus-visible:ring-red-400/20 focus:border-red-400/50" : ""
              }`}
            />
          </div>
          {errors.email && <p className="text-red-400 text-[11px] font-medium mt-1 ml-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2 group">
          <label className="text-sm font-bold text-white/95 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-white/40 group-focus-within:text-accent-orange transition-colors" />
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`pl-11 pr-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-accent-orange/20 focus-visible:border-accent-orange focus:border-accent-orange transition-all rounded-xl w-full ${
                errors.password ? "border-red-400/50 focus-visible:ring-red-400/20 focus:border-red-400/50" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-white/40 hover:text-accent-orange transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-[11px] font-medium mt-1 ml-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={watch("rememberMe")}
              onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)}
              className="border-white/30 data-[state=checked]:bg-accent-orange data-[state=checked]:border-accent-orange"
            />
            <label htmlFor="rememberMe" className="text-xs font-semibold text-white/80 cursor-pointer select-none">
              Remember me
            </label>
          </div>
          <Link href="/forgot-password" className="text-xs font-bold text-accent-orange hover:text-accent-orange/80 transition-colors hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading || isRateLimited}
          className="w-full bg-cta-gradient hover:opacity-95 hover:scale-[1.01] transition-all active:scale-[0.98] text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-orange-500/20 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center bg-white/5 py-4 rounded-2xl border border-white/10">
        <p className="text-white/70 text-sm font-medium">
          Don't have an account?{" "}
          <Link href="/signup" className="text-accent-orange font-extrabold hover:underline hover:text-accent-orange/80">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
