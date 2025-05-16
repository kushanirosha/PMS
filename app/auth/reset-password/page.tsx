'use client';

import { Button, Input, Card } from '@heroui/react';
import Image from 'next/image';
import { handleResetPassword } from '../../../services/auth';
import { useState } from 'react';

export default function ResetPasswordPage({ searchParams }: { searchParams: { email: string } }) {
  const email = searchParams.email;
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    try {
      await handleResetPassword(formData, email);
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
            alt="Reset Password Illustration"
            width={1000}
            height={1125}
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Reset Password Form */}
        <Card className="md:w-2/5 p-8 shadow-lg rounded-xl bg-white">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">New Password</h1>
          <p className="text-yellow-500 flex items-center mb-6">
            <span className="mr-2">💡</span> Create a new password. Ensure it differs from previous ones for security.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form action={onSubmit} className="space-y-4">
            <div>
              <Input
                id="new-password"
                name="new-password"
                label="New password"
                type="password"
                placeholder="Enter new password"
                className="w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <Input
                id="confirm-password"
                name="confirm-password"
                label="Confirm password"
                type="password"
                placeholder="Confirm new password"
                className="w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Reset Password
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}