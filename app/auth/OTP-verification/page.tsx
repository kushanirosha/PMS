'use client'

import { Button, Input, Card } from '@heroui/react';
import Image from 'next/image';

export default function OTPVerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-white">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full mx-4">
        {/* Left Side - Illustration */}
        <div className="md:w-3/5 p-6">
          <Image
            src="/images/verification.webp"
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
            <span className="mr-2">✅</span> We sent a reset link to example@gmail.com enter 5 digit code that mentioned in the email
          </p>

          <form className="space-y-4">
            <div className="flex justify-between mb-4">
              <Input
                id="otp1"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg"
              />
              <Input
                id="otp2"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg"
              />
              <Input
                id="otp3"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg"
              />
              <Input
                id="otp4"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg"
              />
              <Input
                id="otp5"
                label=""
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-gray-300 rounded-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Verify Code
            </Button>

            <p className="text-center text-sm text-green-600 mt-4">
              Haven’t got the email yet? <a href="#" className="hover:underline">Resend email</a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}