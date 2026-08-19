import { Loading } from '@/components/ui/Loading';

export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading text="Chargement..." size="lg" />
    </div>
  );
}