'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckInFormData } from '@/types'
import { checkInGuest } from '@/lib/guestService'
import toast from 'react-hot-toast'

export default function CheckInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [guestInfo, setGuestInfo] = useState<{ name: string; isAlreadyCheckedIn: boolean; extraGuests: number } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CheckInFormData>()

  const onSubmit = async (data: CheckInFormData) => {
    setIsLoading(true)
    try {
      const result = await checkInGuest(data.email)
      if (result.success) {
        setGuestInfo({
          name: result.guestName!,
          isAlreadyCheckedIn: result.isAlreadyCheckedIn || false,
          extraGuests: result.extraGuests || 0
        })
        setIsSuccess(true)
        reset()
        if (result.isAlreadyCheckedIn) {
          toast.success('Welcome back! You\'re already checked in.')
        } else {
          toast.success('Check-in successful! Welcome to the celebration!')
        }
      } else {
        toast.error(result.error || 'Check-in failed. Please verify your email.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess && guestInfo) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 bounce-in pulse-glow">
            <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-elegant text-gold-700 mb-4 slide-up">
            {guestInfo.isAlreadyCheckedIn ? 'Welcome Back!' : 'Check-in Successful!'}
          </h2>
          <p className="text-lg text-gray-600 mb-6 fade-in">
            Hello <span className="font-semibold text-gold-700">{guestInfo.name}</span>! 
            {guestInfo.isAlreadyCheckedIn 
              ? ' You\'re already checked in. Enjoy the celebration!'
              : ' Welcome to the birthday celebration!'
            }
          </p>
          {guestInfo.extraGuests > 0 && (
            <div className="bg-gold-100 border-2 border-gold-300 rounded-lg p-4 mb-6 bounce-in">
              <p className="text-lg text-gold-800 font-semibold text-center">
                Extra Guests: {guestInfo.extraGuests}
              </p>
            </div>
          )}
        </div>

        <div className="bg-gold-50 border-2 border-gold-200 rounded-lg p-6 mb-6 bounce-in shimmer">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gold-200 rounded-full flex items-center justify-center float">
              <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gold-800 mb-2">
            {guestInfo.isAlreadyCheckedIn ? 'Already Checked In' : 'Successfully Checked In'}
          </h3>
          <p className="text-sm text-gold-600">
            {guestInfo.isAlreadyCheckedIn 
              ? 'You were checked in previously'
              : 'You\'re now checked in for the event'
            }
          </p>
        </div>

        <button
          onClick={() => {
            setIsSuccess(false)
            setGuestInfo(null)
          }}
          className="btn-secondary bounce-in"
        >
          Check In Another Guest
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-elegant text-gold-700 mb-4 slide-up">Event Check-in</h2>
        <p className="text-lg text-gray-600 fade-in">
          Enter your email address to check in at the event
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 slide-up">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gold-800 mb-2">
            Email Address *
          </label>
          <input
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
            type="email"
            id="email"
            className="input-field"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Enter the email address you used to register
          </p>
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
                Checking In...
              </div>
            ) : (
              'Check In'
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-cream-50 rounded-lg border border-cream-200">
        <h3 className="font-semibold text-gold-800 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600">
          If you can't check in with your email, please contact the event organizer or make sure you're using the same email address you registered with.
        </p>
      </div>
    </div>
  )
}
