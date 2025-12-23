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
import About from "@/pages/About";
import Settings from "@/pages/Settings";
import Register from "@/pages/Register";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminFields from "@/pages/admin/AdminFields";
import AdminReferees from "@/pages/admin/AdminReferees";
import AdminUsers from "@/pages/admin/AdminUsers";
import Login from "@/pages/Login";
import GameplayView from "@/pages/GameplayView";
import SpectatorView from "@/pages/SpectatorView";
import RefereeView from "@/pages/RefereeView";
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
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/inbox" element={<TeamInbox />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:conversationId" element={<ChatView />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/gameplay/:gameId" element={<GameplayView />} />
          <Route path="/spectator/:gameId" element={<SpectatorView />} />
          <Route path="/referee/:gameId" element={<RefereeView />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="fields" element={<AdminFields />} />
            <Route path="referees" element={<AdminReferees />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
