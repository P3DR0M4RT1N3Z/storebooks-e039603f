import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const CheckIn: React.FC = () => {
  const navigate = useNavigate();
  const { checkIn, verificarCodigoProfessor } = useAuth();
  const [tipo, setTipo] = useState<'cliente' | 'aluno' | 'professor'>('cliente');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    matricula: '',
    escola: '',
    serie: '',
    codigoProfessor: '',
    registro: '',
    disciplinas: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (tipo === 'aluno' && formData.codigoProfessor) {
      const codigoValido = await verificarCodigoProfessor(formData.codigoProfessor);
      if (!codigoValido) {
        toast.error('Código do professor inválido ou expirado');
        return;
      }
    }

    const success = await checkIn({
      ...formData,
      tipo,
      disciplinas: formData.disciplinas ? formData.disciplinas.split(',').map(d => d.trim()) : []
    });

    if (success) {
      toast.success('Check-in realizado com sucesso!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach/20 to-sky/20">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-2xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8 text-center gradient-text">Check-in StoreBooks</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <RadioGroup value={tipo} onValueChange={(value: any) => setTipo(value)}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Label htmlFor="cliente" className="cursor-pointer">
                  <Card className={`p-4 text-center transition-all ${tipo === 'cliente' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="cliente" id="cliente" className="sr-only" />
                    <p className="font-semibold">Cliente</p>
                  </Card>
                </Label>
                <Label htmlFor="aluno" className="cursor-pointer">
                  <Card className={`p-4 text-center transition-all ${tipo === 'aluno' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="aluno" id="aluno" className="sr-only" />
                    <p className="font-semibold">Aluno</p>
                  </Card>
                </Label>
                <Label htmlFor="professor" className="cursor-pointer">
                  <Card className={`p-4 text-center transition-all ${tipo === 'professor' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="professor" id="professor" className="sr-only" />
                    <p className="font-semibold">Professor</p>
                  </Card>
                </Label>
              </div>
            </RadioGroup>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {tipo === 'aluno' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input
                      id="matricula"
                      required
                      value={formData.matricula}
                      onChange={(e) => setFormData({...formData, matricula: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="escola">Escola</Label>
                    <Input
                      id="escola"
                      required
                      value={formData.escola}
                      onChange={(e) => setFormData({...formData, escola: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="codigoProfessor">Código do Professor (opcional)</Label>
                  <Input
                    id="codigoProfessor"
                    placeholder="Digite o código fornecido pelo professor"
                    value={formData.codigoProfessor}
                    onChange={(e) => setFormData({...formData, codigoProfessor: e.target.value})}
                  />
                </div>
              </>
            )}

            {tipo === 'professor' && (
              <div>
                <Label htmlFor="registro">Registro Profissional</Label>
                <Input
                  id="registro"
                  required
                  value={formData.registro}
                  onChange={(e) => setFormData({...formData, registro: e.target.value})}
                />
              </div>
            )}

            <Button type="submit" className="w-full btn-primary">
              Fazer Check-in
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default CheckIn;