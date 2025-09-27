import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CarrinhoProvider } from "@/contexts/CarrinhoContext";
import { FavoritosProvider } from "@/contexts/FavoritosContext";

// Páginas
import Index from "./pages/Index";
import Catalogo from "./pages/Catalogo";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Favoritos from "./pages/Favoritos";
import CheckIn from "./pages/CheckIn";
import MinhaContaPage from "./pages/MinhaConta";
import CheckoutPage from "./pages/Checkout";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import AlunoLivros from "./pages/AlunoLivros";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CarrinhoProvider>
        <FavoritosProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/produto/:id" element={<Produto />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/check-in" element={<CheckIn />} />
                <Route path="/minha-conta" element={<MinhaContaPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
                <Route path="/aluno/livros" element={<AlunoLivros />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FavoritosProvider>
      </CarrinhoProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
