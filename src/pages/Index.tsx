import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';
import { Header } from '@/components/Header';
import { CardLivro } from '@/components/CardLivro';
import { Button } from '@/components/ui/button';
import { getLivrosMaisVendidos, getLivrosNovos, getLivrosRecomendados } from '@/data/livros';

const Index = () => {
  const navigate = useNavigate();
  const livrosMaisVendidos = getLivrosMaisVendidos().slice(0, 4);
  const livrosNovos = getLivrosNovos().slice(0, 4);
  const livrosRecomendados = getLivrosRecomendados().slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-peach/10 to-sky/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">StoreBooks</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sua jornada literária começa aqui. Descubra histórias que transformam vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="btn-primary rounded-full px-8"
                onClick={() => navigate('/catalogo')}
              >
                Explorar Catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                onClick={() => navigate('/check-in')}
              >
                Fazer Check-in
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Acervo Completo</h3>
              <p className="text-muted-foreground">Milhares de títulos dos mais diversos gêneros</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-secondary flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Para Educadores</h3>
              <p className="text-muted-foreground">Sistema especial para professores e alunos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center">
                <Star className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Recomendações</h3>
              <p className="text-muted-foreground">Sugestões personalizadas para você</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mais Vendidos */}
      <section className="py-16 bg-gradient-to-r from-peach/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Mais Vendidos</h2>
            <Button variant="ghost" onClick={() => navigate('/catalogo')}>
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {livrosMaisVendidos.map(livro => (
              <CardLivro key={livro.id} livro={livro} />
            ))}
          </div>
        </div>
      </section>

      {/* Novidades */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Novidades</h2>
            <Button variant="ghost" onClick={() => navigate('/catalogo')}>
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {livrosNovos.map(livro => (
              <CardLivro key={livro.id} livro={livro} />
            ))}
          </div>
        </div>
      </section>

      {/* Recomendados */}
      <section className="py-16 bg-gradient-to-l from-sky/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recomendados para Você</h2>
            <Button variant="ghost" onClick={() => navigate('/catalogo')}>
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {livrosRecomendados.map(livro => (
              <CardLivro key={livro.id} livro={livro} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
