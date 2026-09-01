import { PageSkeleton } from '@/components/ui/Skeleton';

export default function RootLoading() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <PageSkeleton cards={3} />
    </div>
  );
}
