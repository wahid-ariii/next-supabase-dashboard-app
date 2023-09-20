import Shimmer from '@/components/systems/Shimmer';
import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <Title>Session</Title>
      <Shimmer className='mt-2 mb-4 space-y-3'>
        <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      </Shimmer>
      <Shimmer className='space-y-5'>
        <div className='h-8 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        <div className='space-y-3'>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        </div>
      </Shimmer>
    </>
  );
}
