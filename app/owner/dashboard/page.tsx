'use client'

import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuthRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/auth');

  return (
    <html lang="en" className='dark'>
      <body>
        {isAuthRoute ? (
          <>{children}</>
        ) : (
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-green-600 text-white p-6">
              <h2 className="text-xl font-bold mb-6">Property Management System</h2>
              <nav className="space-y-4">
                <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-green-700">
                  Dashboard
                </Link>
                <Link href="/dashboard/properties" className="block py-2 px-4 rounded hover:bg-green-700">
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
              </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-8 bg-gradient-to-r from-green-100 to-white">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}