'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; firstName?: string; lastName?: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ user: { email: string; firstName?: string; lastName?: string; role: string } }>('/api/auth/me')
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleLogout = async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement..." />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mon Profil</h1>
        <p className="text-slate-600 mt-1">Gérez vos informations</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 text-2xl font-bold">
            {user.firstName?.[0] || user.email[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : 'Apprenant'}
            </h2>
            <p className="text-slate-600">{user.email}</p>
            <Badge variant="info" className="mt-1">{user.role}</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <p className="text-slate-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rôle</label>
            <p className="text-slate-900 capitalize">{user.role}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Actions</h3>
        <div className="space-y-3">
          <Button variant="secondary" className="w-full" onClick={handleLogout}>
            Se déconnecter
          </Button>
        </div>
      </Card>
    </div>
  );
}
