import type { Metadata } from 'next';

import NotFoundPage from '@/components/layout/NotFoundPage';

// Try to call notFound() function when rendering page in activuty page to activate this not found page
export const metadata: Metadata = {
  title: 'Not Found',
  description: 'Error not found',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function NotFound() {
  return (
    <NotFoundPage
      status='404'
      title='Not Found Activity Page'
      description='Could not find requested resource'
      link='/activity'
    />
  );
}
