import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, BookOpen } from 'lucide-react';
import { Livro } from '@/data/livros';
import { useCarrinho } from '@/contexts/CarrinhoContext';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CardLivroProps {
  livro: Livro;
  compact?: boolean;
}

export const CardLivro: React.FC<CardLivroProps> = ({ livro, compact = false }) => {
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCarrinho();
  const { adicionarAosFavoritos, removerDosFavoritos, ehFavorito } = useFavoritos();

  const handleToggleFavorito = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ehFavorito(livro.id)) {
      removerDosFavoritos(livro.id);
    } else {
      adicionarAosFavoritos(livro);
    }
  };

  const handleAdicionarCarrinho = (e: React.MouseEvent) => {
    e.stopPropagation();
    adicionarAoCarrinho(livro);
  };

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden card-hover border-peach/20 hover:border-primary/30"
      onClick={() => navigate(`/produto/${livro.id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-peach/10 to-sky/10">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {livro.novo && (
            <Badge className="badge-new">Novo</Badge>
          )}
          {livro.desconto && (
            <Badge className="badge-discount">-{livro.desconto}%</Badge>
          )}
          {livro.maisVendido && (
            <Badge className="bg-gradient-accent text-accent-foreground">
              Mais Vendido
            </Badge>
          )}
        </div>

        {/* Botão Favorito */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={handleToggleFavorito}
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              ehFavorito(livro.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'
            }`}
          />
        </Button>

        {/* Imagem do Livro */}
        <div className="flex items-center justify-center h-full p-8">
          <BookOpen className="h-24 w-24 text-primary/20" />
        </div>

        {/* Overlay com ações - aparece no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Button 
            className="w-full btn-primary"
            onClick={handleAdicionarCarrinho}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Título e Autor */}
        <h3 className={`font-semibold line-clamp-2 mb-1 ${compact ? 'text-sm' : 'text-base'}`}>
          {livro.titulo}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{livro.autor}</p>

        {/* Avaliação */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(livro.avaliacao)
                    ? 'fill-warning text-warning'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {livro.avaliacao} ({livro.numeroAvaliacoes})
          </span>
        </div>

        {/* Preços */}
        <div className="flex items-baseline gap-2">
          {livro.precoPromocional ? (
            <>
              <span className="text-lg font-bold text-primary">
                {formatarPreco(livro.precoPromocional)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatarPreco(livro.preco)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">
              {formatarPreco(livro.preco)}
            </span>
          )}
        </div>

        {/* Tags */}
        {!compact && livro.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {livro.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};