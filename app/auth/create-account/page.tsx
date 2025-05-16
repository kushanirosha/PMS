'use client';

import { Button, Checkbox, Input, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { handleSignUp } from '../../../services/auth';
import { useState } from 'react';

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    try {
      await handleSignUp(formData);
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
            src="/images/login.png"
            alt="Sign Up Illustration"
            width={1000}
            height={1125}
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Sign Up Form */}
        <Card className="md:w-2/5 p-8 shadow-lg rounded-xl bg-white">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Property Management System</h1>
          <p className="text-yellow-500 flex items-center mb-6">
            <span className="mr-2">🎉</span> Welcome! Please create your account.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form action={onSubmit} className="space-y-4">
            <div>
              <Input
                id="email"
                name="email"
                label="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <Input
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Checkbox id="remember" name="remember" />
                <label htmlFor="remember" className="ml-2 text-gray-600">Remember Me</label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Sign Up
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              If you already have an account.{' '}
              <Link href="/login" className="text-green-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}