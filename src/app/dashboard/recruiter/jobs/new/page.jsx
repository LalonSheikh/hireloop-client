import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import { auth } from '@/lib/auth'; // Adjust this import path if your Better Auth server instance is located elsewhere
import { headers } from 'next/headers';

export default async function PostJobPage() {
  // 1. Retrieve the authenticated user session on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-neutral-400 text-sm">
        Please log in to access this page.
      </div>
    );
  }

  // 2. Await the company fetch so a resolved object is passed down
  const company = await getLoggedInRecruiterCompany(userId);

  return (
    <div>
      <PostJobForm company={company} />
    </div>
  );
}