import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Livro } from '@/data/livros';
import { toast } from 'sonner';

interface ItemCarrinho {
  livro: Livro;
  quantidade: number;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (livro: Livro, quantidade?: number) => void;
  removerDoCarrinho: (livroId: number) => void;
  atualizarQuantidade: (livroId: number, quantidade: number) => void;
  limparCarrinho: () => void;
  calcularTotal: () => number;
  calcularSubtotal: () => number;
  calcularDesconto: () => number;
  quantidadeTotal: () => number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};

export const CarrinhoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      setItens(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens));
  }, [itens]);

  const adicionarAoCarrinho = (livro: Livro, quantidade: number = 1) => {
    setItens(prevItens => {
      const itemExistente = prevItens.find(item => item.livro.id === livro.id);
      
      if (itemExistente) {
        // Atualizar quantidade se o item já existe
        const novosItens = prevItens.map(item =>
          item.livro.id === livro.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
        
        toast.success(`${livro.titulo} atualizado no carrinho!`, {
          description: `Quantidade: ${itemExistente.quantidade + quantidade}`,
          duration: 2000,
        });
        
        return novosItens;
      } else {
        // Adicionar novo item
        toast.success(`${livro.titulo} adicionado ao carrinho!`, {
          description: 'Continue comprando ou finalize seu pedido',
          duration: 2000,
        });
        
        return [...prevItens, { livro, quantidade }];
      }
    });
  };

  const removerDoCarrinho = (livroId: number) => {
    setItens(prevItens => {
      const item = prevItens.find(i => i.livro.id === livroId);
      if (item) {
        toast.info(`${item.livro.titulo} removido do carrinho`, {
          duration: 2000,
        });
      }
      return prevItens.filter(item => item.livro.id !== livroId);
    });
  };

  const atualizarQuantidade = (livroId: number, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(livroId);
      return;
    }

    setItens(prevItens =>
      prevItens.map(item =>
        item.livro.id === livroId
          ? { ...item, quantidade }
          : item
      )
    );
  };

  const limparCarrinho = () => {
    setItens([]);
    toast.success('Carrinho limpo com sucesso!', {
      duration: 2000,
    });
  };

  const calcularSubtotal = () => {
    return itens.reduce((total, item) => {
      const preco = item.livro.preco;
      return total + (preco * item.quantidade);
    }, 0);
  };

  const calcularDesconto = () => {
    return itens.reduce((total, item) => {
      const precoOriginal = item.livro.preco;
      const precoFinal = item.livro.precoPromocional || item.livro.preco;
      const desconto = (precoOriginal - precoFinal) * item.quantidade;
      return total + desconto;
    }, 0);
  };

  const calcularTotal = () => {
    return itens.reduce((total, item) => {
      const preco = item.livro.precoPromocional || item.livro.preco;
      return total + (preco * item.quantidade);
    }, 0);
  };

  const quantidadeTotal = () => {
    return itens.reduce((total, item) => total + item.quantidade, 0);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        calcularTotal,
        calcularSubtotal,
        calcularDesconto,
        quantidadeTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};