'use client';

import { Button, Input, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { handleVerifyOTP } from '../../../services/auth';
import { useState } from 'react';

export default function OTPVerificationPage({ searchParams }: { searchParams: { email: string } }) {
  const email = searchParams.email;
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    try {
      await handleVerifyOTP(formData, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-white">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full mx-4">
        {/* Left Side - Illustration */}
        <div className="md:w-3/5 p-6">
          <Image
            src="/auth/login.png"
            alt="OTP Verification Illustration"
            width={1000}
            height={1125}
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - OTP Verification Form */}
        <Card className="md:w-2/5 p-8 shadow-lg rounded-xl bg-white">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">OTP Verification</h1>
          <p className="text-yellow-500 flex items-center mb-6">
            <span className="mr-2">✅</span> We sent a reset link to {email} enter 5 digit code that mentioned in the email
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form action={onSubmit} className="space-y-4">
            <div className="flex justify-between mb-4">
              <Input
                id="otp1"
                name="otp1"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <Input
                id="otp2"
                name="otp2"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <Input
                id="otp3"
                name="otp3"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <Input
                id="otp4"
                name="otp4"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <Input
                id="otp5"
                name="otp5"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Verify Code
            </Button>

            <p className="text-center text-sm text-green-600 mt-4">
              Haven’t got the email yet? <Link href={`/auth/forget-password?email=${encodeURIComponent(email)}`} className="hover:underline">Resend email</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}