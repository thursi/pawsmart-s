
import { Suspense } from 'react';
import CancelPage from './CancelPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelPage />
    </Suspense>
  );
}
