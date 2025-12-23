import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Games from "@/pages/Games";
import Team from "@/pages/Team";
import TeamInbox from "@/pages/TeamInbox";
import Chat from "@/pages/Chat";
import ChatView from "@/pages/ChatView";
import Leaderboard from "@/pages/Leaderboard";
import Locations from "@/pages/Locations";
import Admin from "@/pages/Admin";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/inbox" element={<TeamInbox />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:conversationId" element={<ChatView />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
