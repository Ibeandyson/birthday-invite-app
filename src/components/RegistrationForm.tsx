'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegistrationFormData } from '@/types'
import { registerGuest } from '@/lib/guestService'
import toast from 'react-hot-toast'

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [uniqueCode, setUniqueCode] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegistrationFormData>()

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)
    try {
      const result = await registerGuest(data)
      if (result.success) {
        setUniqueCode(result.uniqueCode!)
        setIsSuccess(true)
        reset()
        toast.success('Registration successful! Check your email for your unique code.')
      } else {
        toast.error(result.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 bounce-in pulse-glow">
            <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-elegant text-gold-700 mb-4 slide-up">Registration Successful!</h2>
          <p className="text-lg text-gray-600 mb-6 fade-in">
            Thank you for registering! We've sent your unique check-in code to your email.
          </p>
        </div>

        <div className="bg-gold-50 border-2 border-gold-200 rounded-lg p-6 mb-6 bounce-in shimmer">
          <h3 className="text-xl font-semibold text-gold-800 mb-2">Your Unique Code:</h3>
          <div className="text-3xl font-mono font-bold text-gold-700 tracking-wider pulse-glow">
            {uniqueCode}
          </div>
          <p className="text-sm text-gold-600 mt-2">
            Please save this code for check-in at the event
          </p>
        </div>

        <button
          onClick={() => {
            setIsSuccess(false)
            setUniqueCode('')
          }}
          className="btn-secondary bounce-in"
        >
          Register Another Guest
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-elegant text-gold-700 mb-4 slide-up">Guest Registration</h2>
        <p className="text-lg text-gray-600 fade-in">
          Please fill out the form below to register for the birthday celebration
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 slide-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gold-800 mb-2">
              First Name *
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              type="text"
              id="firstName"
              className="input-field"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gold-800 mb-2">
              Last Name *
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              type="text"
              id="lastName"
              className="input-field"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gold-800 mb-2">
            Email Address *
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            id="email"
            className="input-field"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gold-800 mb-2">
            Phone Number *
          </label>
          <input
            {...register('phone', {
              required: 'Phone number is required',
            })}
            type="tel"
            id="phone"
            className="input-field"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </div>
            ) : (
              'Register for Event'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
