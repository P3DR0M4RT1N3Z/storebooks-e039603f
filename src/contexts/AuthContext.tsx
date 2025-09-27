import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, TipoUsuario, Cliente, Aluno, Professor } from '@/types/user';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  checkIn: (dados: CheckInData) => Promise<boolean>;
  verificarCodigoProfessor: (codigo: string) => Promise<boolean>;
  loading: boolean;
}

interface CheckInData {
  nome: string;
  email: string;
  tipo: TipoUsuario;
  telefone?: string;
  cpf?: string;
  // Dados específicos do aluno
  matricula?: string;
  escola?: string;
  serie?: string;
  codigoProfessor?: string;
  // Dados específicos do professor
  registro?: string;
  disciplinas?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    // Simulação de login - em produção seria uma chamada à API
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find((u: any) => u.email === email);

    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
      localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const checkIn = async (dados: CheckInData): Promise<boolean> => {
    // Criar novo usuário baseado no tipo
    const novoUsuario: Usuario = {
      id: Math.random().toString(36).substr(2, 9),
      nome: dados.nome,
      email: dados.email,
      tipo: dados.tipo,
      telefone: dados.telefone,
      cpf: dados.cpf,
      dataCadastro: new Date()
    };

    // Adicionar campos específicos baseado no tipo
    let usuarioCompleto: Usuario = novoUsuario;

    switch (dados.tipo) {
      case 'cliente':
        usuarioCompleto = {
          ...novoUsuario,
          historicoCompras: [],
          favoritos: []
        } as Cliente;
        break;
      
      case 'aluno':
        usuarioCompleto = {
          ...novoUsuario,
          matricula: dados.matricula!,
          escola: dados.escola!,
          serie: dados.serie!,
          codigoProfessor: dados.codigoProfessor,
          livrosDesbloqueados: []
        } as Aluno;
        
        // Se tiver código do professor, desbloquear livros
        if (dados.codigoProfessor) {
          const codigos = JSON.parse(localStorage.getItem('codigosAcesso') || '[]');
          const codigoValido = codigos.find((c: any) => 
            c.codigo === dados.codigoProfessor && !c.usado
          );
          
          if (codigoValido) {
            (usuarioCompleto as Aluno).livrosDesbloqueados = codigoValido.livros;
            // Marcar código como usado
            codigoValido.usado = true;
            codigoValido.usadoPor = usuarioCompleto.id;
            localStorage.setItem('codigosAcesso', JSON.stringify(codigos));
          }
        }
        break;
      
      case 'professor':
        usuarioCompleto = {
          ...novoUsuario,
          registro: dados.registro!,
          escola: dados.escola!,
          disciplinas: dados.disciplinas || [],
          turmas: [],
          codigosGerados: []
        } as Professor;
        break;
    }

    // Salvar usuário no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(usuarioCompleto);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Fazer login automático
    setUsuario(usuarioCompleto);
    localStorage.setItem('usuario', JSON.stringify(usuarioCompleto));

    return true;
  };

  const verificarCodigoProfessor = async (codigo: string): Promise<boolean> => {
    const codigos = JSON.parse(localStorage.getItem('codigosAcesso') || '[]');
    const codigoValido = codigos.find((c: any) => 
      c.codigo === codigo && 
      !c.usado && 
      new Date(c.dataExpiracao) > new Date()
    );
    
    return !!codigoValido;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        usuario, 
        login, 
        logout, 
        checkIn, 
        verificarCodigoProfessor,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};