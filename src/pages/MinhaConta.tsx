import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';

const MinhaContaPage: React.FC = () => {
  const { usuario } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
          {usuario && (
            <div className="space-y-2">
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Tipo:</strong> {usuario.tipo}</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default MinhaContaPage;