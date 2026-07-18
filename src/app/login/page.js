 'use client';
import { useState, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }

    // 1. Token generate karein
    const token = await executeRecaptcha("login");

    // 2. Hamare apne API route se verify karein
    const verifyRes = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    // --- Yahan updated logic hai ---
    if (verifyRes.status === 429) {
      alert("Too many login attempts. Please wait a minute and try again.");
      return;
    }

    const verifyData = await verifyRes.json();

    // 3. Agar verification success hai, tabhi Login proceed karein
    if (verifyData.success) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } else {
      alert("reCAPTCHA verification failed! Please try again.");
    }
  }, [executeRecaptcha, email, password, router, supabase]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-8 border rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold">Admin Login</h2>
        <input 
          type="email" placeholder="Email" className="w-full p-2 mb-4 border"
          onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Password" className="w-full p-2 mb-4 border"
          onChange={(e) => setPassword(e.target.value)} required 
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}