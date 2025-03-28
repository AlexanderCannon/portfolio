"use client";

import { useState } from 'react';
import Button from "~/app/_components/ui/button";
import { api } from '~/trpc/react';
// import { api } from "~/utils/api";

const EmailCaptureForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailMutation = api.contact.emailSignup.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      emailMutation.mutate({ email });
      setSubmitted(true);
    }
  };
  return (
    <section>
      {
        !submitted ? (
          <>
            <h2 className="text-3xl font-bold text-center text-text mb-8 text-gray-900 dark:text-white">Sign up to my mailing list</h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full sm:w-auto p-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-primary focus:outline-none transition duration-300"
              />
              <Button
                type="submit"
                className="bg-accent text-slate-800 py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition duration-300"
              >
                Sign up
              </Button>
            </form>
          </>
        ) : (
          <p className="text-purple-600 text-center mt-4 text-3xl font-bold">Thank you for signing up! You&apos;ll hear from me soon.</p>
        )
      }
    </section >
  )
}

export default EmailCaptureForm;