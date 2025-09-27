import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '@/contexts/CarrinhoContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { calcularTotal, limparCarrinho } = useCarrinho();

  const finalizarCompra = () => {
    limparCarrinho();
    toast.success('Compra realizada com sucesso!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <Card className="p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Finalizar Pedido</h2>
          <p className="text-2xl font-bold mb-6">Total: R$ {calcularTotal().toFixed(2)}</p>
          <Button onClick={finalizarCompra} className="w-full btn-primary">
            Confirmar Compra
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default CheckoutPage;