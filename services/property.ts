'use server';

import { query } from '../lib/db';
import { cookies } from 'next/headers';

export async function handleAddProperty(formData: FormData): Promise<void> {
  // Get the current user from the session cookie
  const userCookie = (await cookies()).get('user')?.value;
  if (!userCookie) {
    throw new Error('User not authenticated');
  }

  const user = JSON.parse(userCookie);
  const userId = user.id;

  // Extract form data
  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const description = formData.get('description') as string;

  // Validate required fields
  if (!name || !address) {
    throw new Error('Name and address are required');
  }

  // Insert the new property into the database
  await query(
    'INSERT INTO properties (user_id, name, address, description) VALUES (?, ?, ?, ?)',
    [userId, name, address, description || null]
  );
}