import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Livro } from '@/data/livros';
import { toast } from 'sonner';

interface FavoritosContextType {
  favoritos: Livro[];
  adicionarAosFavoritos: (livro: Livro) => void;
  removerDosFavoritos: (livroId: number) => void;
  ehFavorito: (livroId: number) => boolean;
  limparFavoritos: () => void;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos deve ser usado dentro de um FavoritosProvider');
  }
  return context;
};

export const FavoritosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoritos, setFavoritos] = useState<Livro[]>([]);

  // Carregar favoritos do localStorage ao iniciar
  useEffect(() => {
    const favoritosSalvos = localStorage.getItem('favoritos');
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);

  // Salvar favoritos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const adicionarAosFavoritos = (livro: Livro) => {
    setFavoritos(prevFavoritos => {
      const jaExiste = prevFavoritos.some(f => f.id === livro.id);
      
      if (jaExiste) {
        toast.info('Este livro já está nos seus favoritos', {
          duration: 2000,
        });
        return prevFavoritos;
      }

      toast.success(`${livro.titulo} adicionado aos favoritos!`, {
        description: '❤️ Você pode acessar seus favoritos a qualquer momento',
        duration: 2000,
      });
      
      return [...prevFavoritos, livro];
    });
  };

  const removerDosFavoritos = (livroId: number) => {
    setFavoritos(prevFavoritos => {
      const livro = prevFavoritos.find(f => f.id === livroId);
      if (livro) {
        toast.info(`${livro.titulo} removido dos favoritos`, {
          duration: 2000,
        });
      }
      return prevFavoritos.filter(f => f.id !== livroId);
    });
  };

  const ehFavorito = (livroId: number) => {
    return favoritos.some(f => f.id === livroId);
  };

  const limparFavoritos = () => {
    setFavoritos([]);
    toast.success('Favoritos limpos com sucesso!', {
      duration: 2000,
    });
  };

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        adicionarAosFavoritos,
        removerDosFavoritos,
        ehFavorito,
        limparFavoritos,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};