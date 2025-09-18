'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegistrationFormData } from '@/types'
import { registerGuest } from '@/lib/guestService'
import toast from 'react-hot-toast'

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasExtraGuests, setHasExtraGuests] = useState(false)
  const [registeredExtraGuests, setRegisteredExtraGuests] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegistrationFormData>()

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)
    try {
      // Prepare form data - only include extraGuests if bringing guests
      const formData: any = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
      }
      
      // Only add extraGuests if user is bringing guests
      if (hasExtraGuests && data.extraGuests) {
        formData.extraGuests = data.extraGuests
      }
      
      const result = await registerGuest(formData)
      if (result.success) {
        setRegisteredExtraGuests(data.extraGuests || 0)
        setIsSuccess(true)
        reset()
        setHasExtraGuests(false)
        toast.success('Registration successful! Check your email for check-in instructions.')
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
            Thank you for registering! We've sent check-in instructions to your email.
          </p>
          {registeredExtraGuests > 0 && (
            <div className="bg-gold-100 border-2 border-gold-300 rounded-lg p-4 mb-6 bounce-in">
              <p className="text-lg text-gold-800 font-semibold text-center">
                Extra Guests: {registeredExtraGuests}
              </p>
            </div>
          )}
        </div>

        <div className="bg-gold-50 border-2 border-gold-200 rounded-lg p-6 mb-6 bounce-in shimmer">
          <h3 className="text-xl font-semibold text-gold-800 mb-2">Check-in Instructions:</h3>
          <p className="text-lg text-gold-700 mb-2">
            Simply use your email address to check in at the event!
          </p>
          <p className="text-sm text-gold-600 mt-2">
            No code needed - just provide your email address at the check-in desk
          </p>
        </div>

        <button
          onClick={() => {
            setIsSuccess(false)
            setRegisteredExtraGuests(0)
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

        <div>
          <label className="block text-sm font-semibold text-gold-800 mb-2">
            Will you be bringing extra guests?
          </label>
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="hasExtraGuests"
                value="no"
                checked={!hasExtraGuests}
                onChange={() => setHasExtraGuests(false)}
                className="mr-2"
              />
              <span className="text-gray-700">No, just me</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hasExtraGuests"
                value="yes"
                checked={hasExtraGuests}
                onChange={() => setHasExtraGuests(true)}
                className="mr-2"
              />
              <span className="text-gray-700">Yes, I'll bring guests</span>
            </label>
          </div>
          
          {hasExtraGuests && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label htmlFor="extraGuests" className="block text-sm font-semibold text-gold-800 mb-2">
                Number of Extra Guests * (3 MAX)
              </label>
              <input
                {...register('extraGuests', {
                  required: hasExtraGuests ? 'Number of extra guests is required' : false,
                  min: {
                    value: 1,
                    message: 'Must be at least 1 extra guest'
                  },
                  max: {
                    value: 3,
                    message: 'Maximum 3 extra guests allowed'
                  }
                })}
                type="number"
                id="extraGuests"
                min="1"
                max="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors duration-200 bg-white"
                placeholder="Enter number of extra guests"
              />
              {errors.extraGuests && (
                <p className="text-red-500 text-sm mt-1">{errors.extraGuests.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                How many extra guests will you be bringing? (1-3)
              </p>
            </div>
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
