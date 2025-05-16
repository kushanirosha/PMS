'use client';

import { Button, Card, Input, Textarea } from '@heroui/react';
import { useState, useEffect, startTransition } from 'react';
import { handleAddProperty } from '../../../services/property';
import PropertyList from '../../../components/PropertyList';
import { X } from 'lucide-react';

export default function DashboardPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        startTransition(() => {
          setSuccess(null);
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  

  return (
    <div>
      

      {/* Properties List */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Properties</h2>
      <PropertyList />

      {/* Modal for Adding Property */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <h2 id="modal-title" className="text-xl font-bold text-gray-800 mb-4">
              Add a New Property
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form action={onsubmit} className="space-y-4">
              <div>
                <Input
                  id="name"
                  name="name"
                  label="Property Name"
                  type="text"
                  placeholder="Enter property name"
                  className="w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div>
                <Input
                  id="address"
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Enter property address"
                  className="w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div>
                <Textarea
                  id="description"
                  name="description"
                  label="Description"
                  placeholder="Enter property description (optional)"
                  className="w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Add Property
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}