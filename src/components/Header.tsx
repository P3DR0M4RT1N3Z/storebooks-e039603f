import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, Book, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '@/contexts/CarrinhoContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [headerVisivel, setHeaderVisivel] = useState(true);
  const [scrollAnterior, setScrollAnterior] = useState(0);
  
  const navigate = useNavigate();
  const { itens } = useCarrinho();
  const { usuario, logout } = useAuth();
  
  const quantidadeCarrinho = itens.reduce((total, item) => total + item.quantidade, 0);

  // Header hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollAtual = window.scrollY;
      
      if (scrollAtual > scrollAnterior && scrollAtual > 100) {
        setHeaderVisivel(false);
      } else {
        setHeaderVisivel(true);
      }
      
      setScrollAnterior(scrollAtual);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollAnterior]);

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault();
    if (busca.trim()) {
      navigate(`/catalogo?busca=${encodeURIComponent(busca)}`);
      setBusca('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 glass transition-transform duration-300 ${
        headerVisivel ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="p-2 rounded-xl bg-gradient-primary group-hover:shadow-glow transition-all duration-300">
              <Book className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold gradient-text">StoreBooks</h1>
              <p className="text-xs text-muted-foreground">Sua livraria online</p>
            </div>
          </div>

          {/* Barra de Busca - Desktop */}
          <form 
            onSubmit={handleBusca}
            className="hidden md:flex flex-1 max-w-xl mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por título, autor ou gênero..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 pr-4 h-10 rounded-full border-peach/30 focus:border-primary"
              />
            </div>
          </form>

          {/* Ações - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/favoritos')}
              className="relative hover:bg-peach/20"
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/carrinho')}
              className="relative hover:bg-sky/20"
            >
              <ShoppingCart className="h-5 w-5" />
              {quantidadeCarrinho > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-primary text-primary-foreground">
                  {quantidadeCarrinho}
                </Badge>
              )}
            </Button>

            {/* Menu do Usuário */}
            {usuario ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-accent/20">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{usuario.nome}</p>
                      <p className="text-xs text-muted-foreground">{usuario.tipo}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/minha-conta')}>
                    Minha Conta
                  </DropdownMenuItem>
                  {usuario.tipo === 'professor' && (
                    <DropdownMenuItem onClick={() => navigate('/professor/dashboard')}>
                      Painel do Professor
                    </DropdownMenuItem>
                  )}
                  {usuario.tipo === 'aluno' && (
                    <DropdownMenuItem onClick={() => navigate('/aluno/livros')}>
                      Meus Livros
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate('/check-in')}
                className="btn-primary rounded-full px-6"
              >
                Entrar
              </Button>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/carrinho')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {quantidadeCarrinho > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-primary text-primary-foreground">
                  {quantidadeCarrinho}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              {menuAberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile Expandido */}
        {menuAberto && (
          <div className="md:hidden py-4 border-t border-border popup-enter">
            <form onSubmit={handleBusca} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar livros..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10 pr-4 h-10 rounded-full"
                />
              </div>
            </form>
            
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/');
                  setMenuAberto(false);
                }}
              >
                Início
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/catalogo');
                  setMenuAberto(false);
                }}
              >
                Catálogo
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/favoritos');
                  setMenuAberto(false);
                }}
              >
                Favoritos
              </Button>
              {usuario ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/minha-conta');
                      setMenuAberto(false);
                    }}
                  >
                    Minha Conta
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive"
                    onClick={() => {
                      handleLogout();
                      setMenuAberto(false);
                    }}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full btn-primary"
                  onClick={() => {
                    navigate('/check-in');
                    setMenuAberto(false);
                  }}
                >
                  Entrar
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};