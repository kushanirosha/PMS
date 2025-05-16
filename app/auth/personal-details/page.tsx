'use client';

import { Button, Input, Card } from '@heroui/react';
import Image from 'next/image';
import { useState } from 'react';
import { handlePersonalDetails } from '../../../services/auth';

export default function PersonalDetailsPage() {
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    try {
      await handlePersonalDetails(formData);
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
            src="/images/user-details.png"
            alt="Personal Details Illustration"
            width={1000}
            height={1125}
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Personal Details Form */}
        <Card className="md:w-2/5 p-8 shadow-lg rounded-xl bg-white">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Personal Details</h1>
          <p className="text-yellow-500 flex items-center mb-6">
            <span className="mr-2">📸</span> Set profile picture
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form action={onSubmit} encType="multipart/form-data" className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">📷</span>
                </div>
                <input
                  type="file"
                  id="profile-picture"
                  name="profile-picture"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <Input
                id="name"
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Create Profile
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}