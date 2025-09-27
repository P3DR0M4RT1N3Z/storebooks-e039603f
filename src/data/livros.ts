// Estrutura de dados para armazenar os livros da livraria
export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  ano: number;
  paginas: number;
  isbn: string;
  sinopse: string;
  preco: number;
  precoPromocional?: number;
  desconto?: number;
  estoque: number;
  categoria: string;
  genero: string[];
  idioma: string;
  tipoCapa: 'Capa Dura' | 'Brochura' | 'Digital';
  imagem: string;
  avaliacao: number;
  numeroAvaliacoes: number;
  tags: string[];
  novo?: boolean;
  maisVendido?: boolean;
  recomendado?: boolean;
  disponivelParaAlunos?: boolean;
  codigoProfessor?: string;
}

// Base de dados de livros
export const livros: Livro[] = [
  {
    id: 1,
    titulo: "Nossas Almas Famintas",
    autor: "Marina Santos",
    editora: "Editora Horizonte",
    ano: 2023,
    paginas: 384,
    isbn: "978-85-123456-78-9",
    sinopse: "Uma jornada emocionante através das profundezas da alma humana, explorando os desejos mais íntimos e as conexões que nos tornam verdadeiramente vivos. Um romance que entrelaça destinos e revela que algumas almas estão destinadas a se encontrar.",
    preco: 49.90,
    precoPromocional: 39.90,
    desconto: 20,
    estoque: 45,
    categoria: "Romance",
    genero: ["Drama", "Romance Contemporâneo", "Ficção"],
    idioma: "Português",
    tipoCapa: "Brochura",
    imagem: "/images/nossas-almas-famintas.jpg",
    avaliacao: 4.8,
    numeroAvaliacoes: 237,
    tags: ["best-seller", "nacional", "emocionante"],
    novo: true,
    maisVendido: true,
    recomendado: true,
    disponivelParaAlunos: true
  },
  {
    id: 2,
    titulo: "O Código da Vinci",
    autor: "Dan Brown",
    editora: "Sextante",
    ano: 2004,
    paginas: 432,
    isbn: "978-85-7542-178-2",
    sinopse: "Um assassinato no Museu do Louvre traz à tona uma sinistra conspiração para revelar um segredo que foi protegido por uma sociedade secreta desde os tempos de Jesus Cristo.",
    preco: 54.90,
    precoPromocional: 42.90,
    desconto: 22,
    estoque: 28,
    categoria: "Suspense",
    genero: ["Thriller", "Mistério", "Aventura"],
    idioma: "Português",
    tipoCapa: "Capa Dura",
    imagem: "/images/codigo-da-vinci.jpg",
    avaliacao: 4.6,
    numeroAvaliacoes: 892,
    tags: ["internacional", "mistério", "best-seller"],
    maisVendido: true,
    recomendado: true,
    disponivelParaAlunos: true
  },
  {
    id: 3,
    titulo: "A Culpa é das Estrelas",
    autor: "John Green",
    editora: "Intrínseca",
    ano: 2012,
    paginas: 288,
    isbn: "978-85-8057-226-1",
    sinopse: "Hazel foi diagnosticada com câncer aos treze anos e agora, aos dezesseis, sobrevive graças a uma droga revolucionária que detém a metástase em seus pulmões. Ela conhece Augustus Waters, e a história deles é contada com humor e tragédia.",
    preco: 39.90,
    precoPromocional: 29.90,
    desconto: 25,
    estoque: 52,
    categoria: "Romance",
    genero: ["Young Adult", "Drama", "Romance"],
    idioma: "Português",
    tipoCapa: "Brochura",
    imagem: "/images/culpa-estrelas.jpg",
    avaliacao: 4.9,
    numeroAvaliacoes: 1245,
    tags: ["jovem adulto", "emocionante", "best-seller"],
    novo: false,
    maisVendido: true,
    recomendado: true,
    disponivelParaAlunos: true
  },
  {
    id: 4,
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J.K. Rowling",
    editora: "Rocco",
    ano: 1997,
    paginas: 264,
    isbn: "978-85-325-1102-1",
    sinopse: "Harry Potter é um garoto órfão que vive infeliz com seus tios até que, em seu décimo primeiro aniversário, descobre ser um bruxo. A partir de então, passa a frequentar a Escola de Magia e Bruxaria de Hogwarts.",
    preco: 44.90,
    precoPromocional: 34.90,
    desconto: 22,
    estoque: 65,
    categoria: "Fantasia",
    genero: ["Fantasia", "Aventura", "Infanto-juvenil"],
    idioma: "Português",
    tipoCapa: "Capa Dura",
    imagem: "/images/harry-potter-1.jpg",
    avaliacao: 4.9,
    numeroAvaliacoes: 3421,
    tags: ["clássico", "magia", "best-seller"],
    maisVendido: true,
    recomendado: true,
    disponivelParaAlunos: true
  },
  {
    id: 5,
    titulo: "1984",
    autor: "George Orwell",
    editora: "Companhia das Letras",
    ano: 1949,
    paginas: 416,
    isbn: "978-85-359-1277-1",
    sinopse: "Winston, herói de 1984, vive aprisionado na engrenagem totalitária de uma sociedade completamente dominada pelo Estado, onde tudo é feito coletivamente, mas cada qual vive sozinho.",
    preco: 49.90,
    estoque: 32,
    categoria: "Ficção Científica",
    genero: ["Distopia", "Ficção Científica", "Clássico"],
    idioma: "Português",
    tipoCapa: "Brochura",
    imagem: "/images/1984.jpg",
    avaliacao: 4.7,
    numeroAvaliacoes: 1876,
    tags: ["clássico", "distopia", "político"],
    recomendado: true,
    disponivelParaAlunos: true
  },
  {
    id: 6,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    editora: "Agir",
    ano: 1943,
    paginas: 96,
    isbn: "978-85-220-0911-9",
    sinopse: "Um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma jornada filosófica e poética através de planetas que encerram a solidão humana.",
    preco: 24.90,
    precoPromocional: 19.90,
    desconto: 20,
    estoque: 78,
    categoria: "Infantil",
    genero: ["Fábula", "Infantil", "Filosofia"],
    idioma: "Português",
    tipoCapa: "Capa Dura",
    imagem: "/images/pequeno-principe.jpg",
    avaliacao: 5.0,
    numeroAvaliacoes: 4532,
    tags: ["clássico", "infantil", "filosofia"],
    maisVendido: true,
    recomendado: true,
    disponivelParaAlunos: true
  },
  {
    id: 7,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    editora: "Penguin Companhia",
    ano: 1899,
    paginas: 256,
    isbn: "978-85-6308-008-5",
    sinopse: "Bento Santiago, o Bentinho, narra a história de seu amor por Capitu, desde a adolescência até o casamento, e suas suspeitas de traição, que o atormentam até o fim da vida.",
    preco: 29.90,
    estoque: 41,
    categoria: "Literatura Brasileira",
    genero: ["Romance", "Clássico", "Literatura Nacional"],
    idioma: "Português",
    tipoCapa: "Brochura",
    imagem: "/images/dom-casmurro.jpg",
    avaliacao: 4.5,
    numeroAvaliacoes: 987,
    tags: ["clássico", "nacional", "literatura"],
    recomendado: true,
    disponivelParaAlunos: true
  },
  {
    id: 8,
    titulo: "O Hobbit",
    autor: "J.R.R. Tolkien",
    editora: "HarperCollins",
    ano: 1937,
    paginas: 336,
    isbn: "978-85-950-4814-2",
    sinopse: "Bilbo Bolseiro é um hobbit que leva uma vida confortável e sem ambições. Até que Gandalf, o mago, bate à sua porta e o convence a partir numa jornada com treze anões.",
    preco: 59.90,
    precoPromocional: 44.90,
    desconto: 25,
    estoque: 38,
    categoria: "Fantasia",
    genero: ["Fantasia", "Aventura", "Épico"],
    idioma: "Português",
    tipoCapa: "Capa Dura",
    imagem: "/images/hobbit.jpg",
    avaliacao: 4.8,
    numeroAvaliacoes: 2134,
    tags: ["fantasia", "aventura", "clássico"],
    novo: false,
    maisVendido: true,
    recomendado: true,
    disponivelParaAlunos: false
  },
  {
    id: 9,
    titulo: "A Menina que Roubava Livros",
    autor: "Markus Zusak",
    editora: "Intrínseca",
    ano: 2005,
    paginas: 480,
    isbn: "978-85-8057-367-1",
    sinopse: "Durante a Segunda Guerra Mundial, uma jovem garota chamada Liesel encontra consolo roubando livros e compartilhando-os com outras pessoas, incluindo o homem judeu escondido em seu porão.",
    preco: 49.90,
    precoPromocional: 37.90,
    desconto: 24,
    estoque: 29,
    categoria: "Drama",
    genero: ["Drama", "Histórico", "Guerra"],
    idioma: "Português",
    tipoCapa: "Brochura",
    imagem: "/images/menina-roubava-livros.jpg",
    avaliacao: 4.7,
    numeroAvaliacoes: 1567,
    tags: ["guerra", "emocionante", "histórico"],
    maisVendido: true,
    recomendado: true,
    disponivelParaAlunos: true
  },
  {
    id: 10,
    titulo: "Sapiens: Uma Breve História da Humanidade",
    autor: "Yuval Noah Harari",
    editora: "L&PM",
    ano: 2014,
    paginas: 472,
    isbn: "978-85-254-3218-6",
    sinopse: "O autor reconstrói a história da humanidade desde a evolução arcaica até o século XXI, oferecendo uma visão ampla de como fomos capazes de dominar o planeta.",
    preco: 64.90,
    estoque: 23,
    categoria: "Não Ficção",
    genero: ["História", "Antropologia", "Ciência"],
    idioma: "Português",
    tipoCapa: "Capa Dura",
    imagem: "/images/sapiens.jpg",
    avaliacao: 4.6,
    numeroAvaliacoes: 892,
    tags: ["história", "ciência", "best-seller"],
    recomendado: true,
    disponivelParaAlunos: false
  }
];

// Função para buscar livros por categoria
export const getLivrosPorCategoria = (categoria: string): Livro[] => {
  return livros.filter(livro => livro.categoria === categoria);
};

// Função para buscar livros por gênero
export const getLivrosPorGenero = (genero: string): Livro[] => {
  return livros.filter(livro => livro.genero.includes(genero));
};

// Função para buscar livros mais vendidos
export const getLivrosMaisVendidos = (): Livro[] => {
  return livros.filter(livro => livro.maisVendido);
};

// Função para buscar novos livros
export const getLivrosNovos = (): Livro[] => {
  return livros.filter(livro => livro.novo);
};

// Função para buscar livros recomendados
export const getLivrosRecomendados = (): Livro[] => {
  return livros.filter(livro => livro.recomendado);
};

// Função para buscar livro por ID
export const getLivroPorId = (id: number): Livro | undefined => {
  return livros.find(livro => livro.id === id);
};

// Função para buscar livros disponíveis para alunos
export const getLivrosParaAlunos = (): Livro[] => {
  return livros.filter(livro => livro.disponivelParaAlunos);
};