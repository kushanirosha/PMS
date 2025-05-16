'use client';

import Link from 'next/link';
import { handleLogout, getUserDetails } from '../../../services/auth';
import { Button, Card } from '@heroui/react';
import { Suspense } from 'react';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuthRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/auth');

  return (
    <>
      {isAuthRoute ? (
        <>{children}</>
      ) : (
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-green-600 text-white p-6">
            <h2 className="text-xl font-bold mb-2">Property Management System</h2>
            <Suspense fallback={<div className="text-white">Loading user info...</div>}>
             
            </Suspense>
            <nav className="space-y-4 mt-6">
              <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-green-700">
                Dashboard
              </Link>
              <Link href="/owner/properties" className="block py-2 px-4 rounded hover:bg-green-700">
                Properties
              </Link>
              <Link href="/dashboard/tenants" className="block py-2 px-4 rounded hover:bg-green-700">
                Tenants
              </Link>
              <Link href="/dashboard/income" className="block py-2 px-4 rounded hover:bg-green-700">
                Income
              </Link>
              <Link href="/dashboard/expense" className="block py-2 px-4 rounded hover:bg-green-700">
                Expense
              </Link>
              <Link href="/dashboard/task" className="block py-2 px-4 rounded hover:bg-green-700">
                Task
              </Link>
              <Link href="/dashboard/message" className="block py-2 px-4 rounded hover:bg-green-700">
                Message
              </Link>
              <Link href="/dashboard/setting" className="block py-2 px-4 rounded hover:bg-green-700">
                Setting
              </Link>
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="block w-full py-2 px-4 rounded text-left hover:bg-green-700"
                >
                  Logout
                </button>
              </form>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-gradient-to-r from-green-100 to-white">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome to Property Management System</h1>
                <p className="text-gray-600 mt-2">
                  Today is {new Date().toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short', timeZone: 'Asia/Kolkata' })}.
                  Let’s manage your properties efficiently!
                </p>
              </div>
            </div>

            {/* Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 shadow-lg rounded-xl bg-white">
                <h2 className="text-xl font-semibold text-gray-800">Total Properties</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">30</p>
              </Card>
              <Card className="p-6 shadow-lg rounded-xl bg-white">
                <h2 className="text-xl font-semibold text-gray-800">Total Tenants</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">50</p>
              </Card>
              <Card className="p-6 shadow-lg rounded-xl bg-white">
                <h2 className="text-xl font-semibold text-gray-800">Total Income</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">$5000</p>
              </Card>
            </div>

            {children}
          </main>
        </div>
      )}
    </>
  );
}