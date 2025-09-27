import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';

const AlunoLivros: React.FC = () => {
  const { usuario } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Meus Livros</h1>
        <Card className="p-6">
          <p className="text-muted-foreground">Livros desbloqueados pelo código do professor aparecerão aqui</p>
        </Card>
      </main>
    </div>
  );
};

export default AlunoLivros;