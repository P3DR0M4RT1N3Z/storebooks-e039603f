import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfessorDashboard: React.FC = () => {
  const { usuario } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Painel do Professor</h1>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Gerenciar Turmas</h2>
          <p className="text-muted-foreground mb-4">Crie códigos de acesso para seus alunos</p>
          <Button className="btn-primary">Gerar Novo Código</Button>
        </Card>
      </main>
    </div>
  );
};

export default ProfessorDashboard;