import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCarrinho } from '@/contexts/CarrinhoContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Carrinho: React.FC = () => {
  const navigate = useNavigate();
  const { itens, removerDoCarrinho, atualizarQuantidade, calcularTotal, calcularSubtotal, calcularDesconto, limparCarrinho } = useCarrinho();

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
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
        
        {itens.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-xl text-muted-foreground mb-4">Seu carrinho está vazio</p>
            <Button onClick={() => navigate('/catalogo')} className="btn-primary">
              Continuar Comprando
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {itens.map(item => (
                <Card key={item.livro.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-28 bg-gradient-to-br from-peach/10 to-sky/10 rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.livro.titulo}</h3>
                      <p className="text-sm text-muted-foreground">{item.livro.autor}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border rounded">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => atualizarQuantidade(item.livro.id, item.quantidade - 1)}
                          >
                            -
                          </Button>
                          <span className="px-3">{item.quantidade}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => atualizarQuantidade(item.livro.id, item.quantidade + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removerDoCarrinho(item.livro.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {formatarPreco((item.livro.precoPromocional || item.livro.preco) * item.quantidade)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatarPreco(calcularSubtotal())}</span>
                  </div>
                  {calcularDesconto() > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Desconto</span>
                      <span>-{formatarPreco(calcularDesconto())}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatarPreco(calcularTotal())}</span>
                  </div>
                </div>
                <Button 
                  className="w-full btn-primary mb-2"
                  onClick={() => navigate('/checkout')}
                >
                  Finalizar Compra
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/catalogo')}
                >
                  Continuar Comprando
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Carrinho;