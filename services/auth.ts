'use server';

import { query } from '../lib/db';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import nodemailer from 'nodemailer';
import { promises as fs } from 'fs';
import path from 'path';

export async function handleLogin(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const users = await query('SELECT * FROM users WHERE email = ?', [email]);

  if (users.length === 0) {
    throw new Error('User not found');
  }

  const user = users[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  (await cookies()).set('user', JSON.stringify({ id: user.id, email: user.email }), {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24, // 1 day
  });

  redirect('/owner/dashboard');
}

export async function handleForgotPassword(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;

  const users = await query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) {
    throw new Error('User not found');
  }

  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await query('UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?', [otp, otpExpiry, email]);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset OTP - Property Management System',
    text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);

  redirect(`/auth/otp-verification?email=${encodeURIComponent(email)}`);
}

export async function handleVerifyOTP(formData: FormData, email: string): Promise<void> {
  const otp = `${formData.get('otp1')}${formData.get('otp2')}${formData.get('otp3')}${formData.get('otp4')}${formData.get('otp5')}`;

  const users = await query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) {
    throw new Error('User not found');
  }

  const user = users[0];
  const currentTime = new Date();

  if (user.otp !== otp || !user.otp_expiry || new Date(user.otp_expiry) < currentTime) {
    throw new Error('Invalid or expired OTP');
  }

  await query('UPDATE users SET otp = NULL, otp_expiry = NULL WHERE email = ?', [email]);

  redirect(`/auth/reset-password?email=${encodeURIComponent(email)}`);
}

export async function handleResetPassword(formData: FormData, email: string): Promise<void> {
  const newPassword = formData.get('new-password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  if (newPassword !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

  redirect('/auth/login');
}

export async function handleLogout(): Promise<void> {
  cookies().delete('user');
  redirect('/auth/login');
}

export async function handleSignUp(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const existingUsers = await query('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUsers.length > 0) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, 'Owner']);

  const newUser = await query('SELECT * FROM users WHERE email = ?', [email]);
  cookies().set('user', JSON.stringify({ id: newUser[0].id, email: newUser[0].email }), {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  redirect('/auth/personal-details');
}

export async function handlePersonalDetails(formData: FormData): Promise<void> {
  const userCookie = (await cookies()).get('user')?.value;
  if (!userCookie) {
    throw new Error('User not authenticated');
  }

  const user = JSON.parse(userCookie);
  const userId = user.id;

  const name = formData.get('name') as string;
  let profilePicturePath: string | null = null;

  const profilePicture = formData.get('profile-picture') as File;
  if (profilePicture && profilePicture.size > 0) {
    const fileName = `user_${userId}_profile_${Date.now()}${path.extname(profilePicture.name)}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    
    const buffer = Buffer.from(await profilePicture.arrayBuffer());
    
    await fs.writeFile(filePath, buffer);
    
    profilePicturePath = `/uploads/${fileName}`;
  }

  await query(
    'UPDATE users SET name = ?, profile_picture = ? WHERE id = ?',
    [name, profilePicturePath, userId]
  );

  redirect('/owner/dashboard');
}

export async function getUserDetails() {
  const userCookie = (await cookies()).get('user')?.value;
  if (!userCookie) {
    redirect('/auth/login');
  }

  const user = JSON.parse(userCookie);
  const users = await query('SELECT name, role FROM users WHERE id = ?', [user.id]);
  
  if (users.length === 0) {
    throw new Error('User not found');
  }

  return users[0];
}