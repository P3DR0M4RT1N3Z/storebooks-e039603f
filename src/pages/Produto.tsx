import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, BookOpen, ArrowLeft, Share2, Shield, Truck } from 'lucide-react';
import { getLivroPorId, getLivrosRecomendados } from '@/data/livros';
import { useCarrinho } from '@/contexts/CarrinhoContext';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { Header } from '@/components/Header';
import { CardLivro } from '@/components/CardLivro';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Produto: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCarrinho();
  const { adicionarAosFavoritos, removerDosFavoritos, ehFavorito } = useFavoritos();
  
  const [quantidade, setQuantidade] = useState(1);
  
  const livro = getLivroPorId(Number(id));
  const livrosRecomendados = getLivrosRecomendados().filter(l => l.id !== Number(id)).slice(0, 4);

  if (!livro) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Livro não encontrado</h1>
          <Button onClick={() => navigate('/catalogo')}>
            Voltar ao Catálogo
          </Button>
        </div>
      </div>
    );
  }

  const handleToggleFavorito = () => {
    if (ehFavorito(livro.id)) {
      removerDosFavoritos(livro.id);
    } else {
      adicionarAosFavoritos(livro);
    }
  };

  const handleAdicionarCarrinho = () => {
    adicionarAoCarrinho(livro, quantidade);
  };

  const handleCompartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: livro.titulo,
        text: `Confira este livro: ${livro.titulo} por ${livro.autor}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-peach/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Produto Principal */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Imagem */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-peach/10 to-sky/10 rounded-xl overflow-hidden">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
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
            
            <div className="flex items-center justify-center h-full p-12">
              <BookOpen className="h-48 w-48 text-primary/20" />
            </div>
          </div>

          {/* Informações */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{livro.titulo}</h1>
              <p className="text-lg text-muted-foreground mb-4">por {livro.autor}</p>
              
              {/* Avaliação */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(livro.avaliacao)
                          ? 'fill-warning text-warning'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{livro.avaliacao}</span>
                <span className="text-muted-foreground">
                  ({livro.numeroAvaliacoes} avaliações)
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {livro.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Preço */}
            <div className="space-y-4">
              <div>
                {livro.precoPromocional ? (
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-primary">
                        {formatarPreco(livro.precoPromocional)}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatarPreco(livro.preco)}
                      </span>
                    </div>
                    <Badge className="badge-discount">
                      Você economiza {formatarPreco(livro.preco - livro.precoPromocional)}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    {formatarPreco(livro.preco)}
                  </span>
                )}
              </div>

              {/* Quantidade e Ações */}
              <div className="flex gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                    className="rounded-r-none"
                  >
                    -
                  </Button>
                  <span className="px-4 font-semibold">{quantidade}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="rounded-l-none"
                  >
                    +
                  </Button>
                </div>
                
                <Button
                  className="flex-1 btn-primary"
                  onClick={handleAdicionarCarrinho}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </div>

              {/* Ações Secundárias */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleToggleFavorito}
                >
                  <Heart 
                    className={`h-4 w-4 mr-2 ${
                      ehFavorito(livro.id) ? 'fill-destructive text-destructive' : ''
                    }`}
                  />
                  {ehFavorito(livro.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCompartilhar}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Benefícios */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-success/10">
                  <Truck className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Frete Grátis</p>
                  <p className="text-sm text-muted-foreground">Para compras acima de R$ 99</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Compra Segura</p>
                  <p className="text-sm text-muted-foreground">Seus dados protegidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Informações */}
        <Tabs defaultValue="descricao" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="descricao">Descrição</TabsTrigger>
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="descricao" className="mt-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Sinopse</h3>
              <p className="text-muted-foreground leading-relaxed">{livro.sinopse}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="detalhes" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Editora:</span>
                  <span className="font-medium">{livro.editora}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ano:</span>
                  <span className="font-medium">{livro.ano}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Páginas:</span>
                  <span className="font-medium">{livro.paginas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-medium">{livro.isbn}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Idioma:</span>
                  <span className="font-medium">{livro.idioma}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo de Capa:</span>
                  <span className="font-medium">{livro.tipoCapa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoria:</span>
                  <span className="font-medium">{livro.categoria}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gêneros:</span>
                  <span className="font-medium">{livro.genero.join(', ')}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="avaliacoes" className="mt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                As avaliações dos clientes estarão disponíveis em breve!
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Livros Recomendados */}
        {livrosRecomendados.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Você também pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {livrosRecomendados.map(livro => (
                <CardLivro key={livro.id} livro={livro} compact />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Produto;