'use client';

import { useLayoutEffect, useState } from 'react';
import { decryptToken } from '@/utils/protect';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/app/loading';

export const withNotAuth = (WrappedComponent: any) => {
  return function WithNotAuth(props: any) {
    const [canRender, setCanRender] = useState(false);
    const router = useRouter();

    useLayoutEffect(() => {
      const checkAuth = async () => {
        const token = await decryptToken();

        if (token) {
          // User is already logged in → redirect away
          router.replace('/dashboard'); // adjust route if needed
        } else {
          // User is NOT logged in → allow page
          setCanRender(true);
        }
      };

      checkAuth();
    }, [router]);

    if (!canRender) {
      return <LoadingPage />;
    }

    return <WrappedComponent {...props} />;
  };
};
