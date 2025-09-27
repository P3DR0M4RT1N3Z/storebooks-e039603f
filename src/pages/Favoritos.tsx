import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { Header } from '@/components/Header';
import { CardLivro } from '@/components/CardLivro';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Favoritos: React.FC = () => {
  const navigate = useNavigate();
  const { favoritos } = useFavoritos();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Meus Favoritos</h1>
        
        {favoritos.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-xl text-muted-foreground mb-4">Você ainda não tem favoritos</p>
            <Button onClick={() => navigate('/catalogo')} className="btn-primary">
              Explorar Catálogo
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoritos.map(livro => (
              <CardLivro key={livro.id} livro={livro} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favoritos;