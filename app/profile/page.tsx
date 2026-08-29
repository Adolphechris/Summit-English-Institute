'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; firstName?: string; lastName?: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    apiFetch<{ user: { email: string; firstName?: string; lastName?: string; role: string } }>('/api/auth/me')
      .then((data) => {
        setUser(data.user);
        setFirstName(data.user.firstName || '');
        setLastName(data.user.lastName || '');
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setMessage(null);

    try {
      const data = await apiFetch<{ user: any; message: string }>('/api/auth/me', {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName }),
      });
      setUser(data.user);
      setMessage({ type: 'success', text: 'Informations personnelles mises à jour !' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Erreur lors de la mise à jour.' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    setSavingPassword(true);
    setMessage(null);

    try {
      await apiFetch('/api/auth/me', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword('');
      setNewPassword('');
      setMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Échec du changement de mot de passe.' });
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement du profil..." />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mon Profil</h1>
        <p className="text-slate-600 mt-1">Gérez vos informations personnelles et votre sécurité.</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg text-sm font-medium ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 text-2xl font-bold">
              {user.firstName?.[0] || user.email[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : 'Apprenant Summit'}
              </h2>
              <p className="text-slate-600 text-sm font-mono">{user.email}</p>
              <Badge variant={user.role === 'admin' ? 'warning' : 'info'} className="mt-1">
                {user.role.toUpperCase()}
              </Badge>
            </div>
          </div>

          {user.role === 'admin' && (
            <Link href="/admin">
              <Button variant="primary" size="sm">Espace Admin</Button>
            </Link>
          )}
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <h3 className="font-semibold text-slate-900 border-b pb-2">Informations Personnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ex: Jean"
            />
            <Input
              label="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ex: Dupont"
            />
          </div>
          <Button type="submit" variant="primary" loading={savingProfile}>
            Enregistrer les modifications
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <h3 className="font-semibold text-slate-900 border-b pb-2">Changer de mot de passe</h3>
          <Input
            label="Mot de passe actuel"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            label="Nouveau mot de passe"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="secondary" loading={savingPassword}>
            Mettre à jour le mot de passe
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-2">Session</h3>
        <p className="text-slate-600 text-sm mb-4">Se déconnecter de votre compte Summit English Institute.</p>
        <Button variant="outline" className="w-full text-rose-600 border-rose-200 hover:bg-rose-50" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </Card>
    </div>
  );
}
