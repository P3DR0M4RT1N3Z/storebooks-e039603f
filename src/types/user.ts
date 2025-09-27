// Tipos de usuário e interfaces relacionadas

export type TipoUsuario = 'cliente' | 'aluno' | 'professor';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  telefone?: string;
  cpf?: string;
  dataCadastro: Date;
}

export interface Cliente extends Usuario {
  tipo: 'cliente';
  endereco?: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  historicoCompras: number[]; // IDs das compras
  favoritos: number[]; // IDs dos livros favoritos
}

export interface Aluno extends Usuario {
  tipo: 'aluno';
  matricula: string;
  escola: string;
  serie: string;
  codigoProfessor?: string;
  livrosDesbloqueados: number[]; // IDs dos livros
}

export interface Professor extends Usuario {
  tipo: 'professor';
  registro: string;
  escola: string;
  disciplinas: string[];
  turmas: Turma[];
  codigosGerados: CodigoAcesso[];
}

export interface Turma {
  id: string;
  nome: string;
  serie: string;
  ano: number;
  alunos: string[]; // IDs dos alunos
  livrosSelecionados: number[]; // IDs dos livros
}

export interface CodigoAcesso {
  codigo: string;
  turmaId: string;
  livros: number[]; // IDs dos livros
  dataGeracao: Date;
  dataExpiracao: Date;
  usado: boolean;
  usadoPor?: string; // ID do aluno
}