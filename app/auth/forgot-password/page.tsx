'use client'

import { Button, Input, Card } from '@heroui/react';
import Image from 'next/image';

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-white">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full mx-4">
        {/* Left Side - Illustration */}
        <div className="md:w-3/5 p-6">
          <Image
            src="/images/forgot-password.png"
            alt="Forgot Password Illustration"
            width={1000}
            height={1125}
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Forgot Password Form */}
        <Card className="md:w-2/5 p-8 shadow-lg rounded-xl bg-white">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
          <p className="text-yellow-500 flex items-center mb-6">
            <span className="mr-2">⚠️</span> Please Enter your email to reset the password
          </p>

          <form className="space-y-4">
            <div>
              <Input
                id="email"
                label="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 border-gray-300 rounded-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Send OTP
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              If you haven’t account.{' '}
              <a href="/login" className="text-green-600 hover:underline">
                Create new account
              </a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}