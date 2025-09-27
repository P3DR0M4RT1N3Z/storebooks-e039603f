import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { livros } from '@/data/livros';
import { Header } from '@/components/Header';
import { CardLivro } from '@/components/CardLivro';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

// Extrair categorias e gêneros únicos
const categoriasUnicas = [...new Set(livros.map(l => l.categoria))];
const generosUnicos = [...new Set(livros.flatMap(l => l.genero))];
const autoresUnicos = [...new Set(livros.map(l => l.autor))];
const idiomasUnicos = [...new Set(livros.map(l => l.idioma))];
const tiposCapaUnicos = [...new Set(livros.map(l => l.tipoCapa))];

const Catalogo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const buscaInicial = searchParams.get('busca') || '';
  
  const [busca, setBusca] = useState(buscaInicial);
  const [ordenacao, setOrdenacao] = useState('relevancia');
  const [filtroAberto, setFiltroAberto] = useState(false);
  
  // Filtros
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string[]>([]);
  const [generosSelecionados, setGenerosSelecionados] = useState<string[]>([]);
  const [autoresSelecionados, setAutoresSelecionados] = useState<string[]>([]);
  const [precoRange, setPrecoRange] = useState([0, 200]);
  const [avaliacaoMinima, setAvaliacaoMinima] = useState(0);
  const [idiomaSelecionado, setIdiomaSelecionado] = useState<string[]>([]);
  const [tipoCapaSelecionado, setTipoCapaSelecionado] = useState<string[]>([]);

  // Filtrar e ordenar livros
  const livrosFiltrados = useMemo(() => {
    let resultado = [...livros];

    // Busca por texto
    if (busca) {
      resultado = resultado.filter(livro =>
        livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        livro.autor.toLowerCase().includes(busca.toLowerCase()) ||
        livro.genero.some(g => g.toLowerCase().includes(busca.toLowerCase()))
      );
    }

    // Filtros
    if (categoriaSelecionada.length > 0) {
      resultado = resultado.filter(l => categoriaSelecionada.includes(l.categoria));
    }
    if (generosSelecionados.length > 0) {
      resultado = resultado.filter(l => 
        l.genero.some(g => generosSelecionados.includes(g))
      );
    }
    if (autoresSelecionados.length > 0) {
      resultado = resultado.filter(l => autoresSelecionados.includes(l.autor));
    }
    if (idiomaSelecionado.length > 0) {
      resultado = resultado.filter(l => idiomaSelecionado.includes(l.idioma));
    }
    if (tipoCapaSelecionado.length > 0) {
      resultado = resultado.filter(l => tipoCapaSelecionado.includes(l.tipoCapa));
    }

    // Filtro de preço
    resultado = resultado.filter(l => {
      const preco = l.precoPromocional || l.preco;
      return preco >= precoRange[0] && preco <= precoRange[1];
    });

    // Filtro de avaliação
    resultado = resultado.filter(l => l.avaliacao >= avaliacaoMinima);

    // Ordenação
    switch (ordenacao) {
      case 'preco-asc':
        resultado.sort((a, b) => 
          (a.precoPromocional || a.preco) - (b.precoPromocional || b.preco)
        );
        break;
      case 'preco-desc':
        resultado.sort((a, b) => 
          (b.precoPromocional || b.preco) - (a.precoPromocional || a.preco)
        );
        break;
      case 'avaliacao':
        resultado.sort((a, b) => b.avaliacao - a.avaliacao);
        break;
      case 'nome':
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
    }

    return resultado;
  }, [busca, ordenacao, categoriaSelecionada, generosSelecionados, autoresSelecionados, 
      precoRange, avaliacaoMinima, idiomaSelecionado, tipoCapaSelecionado]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Título e Busca */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Catálogo de Livros</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por título, autor ou gênero..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={ordenacao} onValueChange={setOrdenacao}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Relevância</SelectItem>
                <SelectItem value="preco-asc">Menor Preço</SelectItem>
                <SelectItem value="preco-desc">Maior Preço</SelectItem>
                <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
                <SelectItem value="nome">Nome (A-Z)</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setFiltroAberto(!filtroAberto)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filtros Laterais - Desktop */}
          <aside className={`${filtroAberto ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
            {/* Categoria */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="font-semibold">Categoria</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-2">
                {categoriasUnicas.map(categoria => (
                  <div key={categoria} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${categoria}`}
                      checked={categoriaSelecionada.includes(categoria)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCategoriaSelecionada([...categoriaSelecionada, categoria]);
                        } else {
                          setCategoriaSelecionada(categoriaSelecionada.filter(c => c !== categoria));
                        }
                      }}
                    />
                    <Label htmlFor={`cat-${categoria}`} className="text-sm cursor-pointer">
                      {categoria}
                    </Label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Gênero */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="font-semibold">Gênero</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-2 max-h-48 overflow-y-auto">
                {generosUnicos.map(genero => (
                  <div key={genero} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gen-${genero}`}
                      checked={generosSelecionados.includes(genero)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setGenerosSelecionados([...generosSelecionados, genero]);
                        } else {
                          setGenerosSelecionados(generosSelecionados.filter(g => g !== genero));
                        }
                      }}
                    />
                    <Label htmlFor={`gen-${genero}`} className="text-sm cursor-pointer">
                      {genero}
                    </Label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Preço */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="font-semibold">Preço</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-4">
                  <Slider
                    value={precoRange}
                    onValueChange={setPrecoRange}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>R$ {precoRange[0]}</span>
                    <span>R$ {precoRange[1]}</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Avaliação */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="font-semibold">Avaliação Mínima</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={avaliacaoMinima === rating}
                        onCheckedChange={(checked) => {
                          setAvaliacaoMinima(checked ? rating : 0);
                        }}
                      />
                      <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                        {rating}+ estrelas
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Limpar Filtros */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setCategoriaSelecionada([]);
                setGenerosSelecionados([]);
                setAutoresSelecionados([]);
                setPrecoRange([0, 200]);
                setAvaliacaoMinima(0);
                setIdiomaSelecionado([]);
                setTipoCapaSelecionado([]);
              }}
            >
              Limpar Filtros
            </Button>
          </aside>

          {/* Grid de Livros */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {livrosFiltrados.length} livros encontrados
              </p>
            </div>
            
            {livrosFiltrados.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {livrosFiltrados.map(livro => (
                  <CardLivro key={livro.id} livro={livro} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Nenhum livro encontrado com os filtros selecionados.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setBusca('');
                    setCategoriaSelecionada([]);
                    setGenerosSelecionados([]);
                    setAutoresSelecionados([]);
                    setPrecoRange([0, 200]);
                    setAvaliacaoMinima(0);
                    setIdiomaSelecionado([]);
                    setTipoCapaSelecionado([]);
                  }}
                >
                  Limpar todos os filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Catalogo;