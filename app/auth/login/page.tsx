'use client'

import { Button, Checkbox, Input, Card } from '@heroui/react';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-green-200 to-white">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full mx-4">
        {/* Left Side - Illustration */}
        <div className="md:w-4/8">
          <Image
            src="/images/login.png"
            alt="Property Management Illustration"
            width={800}
            height={900}
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Login Form */}
        <Card className="md:w-1/2 p-8 shadow-lg rounded-xl bg-white">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Property Management System</h1>
          <p className="text-yellow-500 flex items-center mb-6">
            <span className="mr-2">🎉</span> Welcome back! Please login to your account.
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

            <div>
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="ml-2 text-gray-600">Remember Me</label>
              </div>
              <a href="/auth/forgot-password" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Sign Up
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              If you haven’t account.{' '}
              <a href="#" className="text-green-600 hover:underline">
                Create new account
              </a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}