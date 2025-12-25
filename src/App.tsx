import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
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
import AdminMatches from "@/pages/admin/AdminMatches";
import AdminMatchDetails from "@/pages/admin/AdminMatchDetails";
import AdminReports from "@/pages/admin/AdminReports";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminRadio from "@/pages/admin/AdminRadio";
import AdminAllViews from "@/pages/admin/AdminAllViews";
import Login from "@/pages/Login";
import GameplayView from "@/pages/GameplayView";
import SpectatorView from "@/pages/SpectatorView";
import RefereeView from "@/pages/RefereeView";
import NotFound from "@/pages/NotFound";
import Landing from "@/pages/Landing";
import Demo from "@/pages/Demo";
import Shop from "@/pages/Shop";
import FieldDetail from "@/pages/FieldDetail";
import Profile from "@/pages/Profile";
import Equipment from "@/pages/Equipment";
import GameDetail from "@/pages/GameDetail";
import Marketplace from "@/pages/Marketplace";
import Organize from "@/pages/Organize";
import AccessDenied from "@/pages/AccessDenied";
import Achievements from "@/pages/Achievements";
import FieldManagerDashboard from "@/pages/FieldManagerDashboard";
import ShopManagerDashboard from "@/pages/ShopManagerDashboard";
import RefereeAssignments from "@/pages/RefereeAssignments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Dashboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:gameId" element={<GameDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/inbox" element={<TeamInbox />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:conversationId" element={<ChatView />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:slug" element={<FieldDetail />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/organize" element={<Organize />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Field Manager Routes */}
            <Route path="/field-manager/fields" element={
              <ProtectedRoute roles={['field_manager', 'admin']} redirectTo="/access-denied">
                <FieldManagerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Shop Manager Routes */}
            <Route path="/shop-manager/dashboard" element={
              <ProtectedRoute roles={['shop_owner', 'admin']} redirectTo="/access-denied">
                <ShopManagerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Referee Routes */}
            <Route path="/profile/referee-assignments" element={
              <ProtectedRoute roles={['referee', 'admin']} redirectTo="/access-denied">
                <RefereeAssignments />
              </ProtectedRoute>
            } />
          </Route>
          
          {/* Gameplay Routes - Protected */}
          <Route path="/gameplay" element={
            <ProtectedRoute>
              <GameplayView />
            </ProtectedRoute>
          } />
          <Route path="/gameplay/:gameId" element={
            <ProtectedRoute>
              <GameplayView />
            </ProtectedRoute>
          } />
          
          {/* Spectator - Public */}
          <Route path="/spectator/:gameId" element={<SpectatorView />} />
          
          {/* Referee Game View */}
          <Route path="/referee/:gameId" element={
            <ProtectedRoute roles={['referee', 'admin']} redirectTo="/access-denied">
              <RefereeView />
            </ProtectedRoute>
          } />
          
          <Route path="/access-denied" element={<AccessDenied />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin redirectTo="/access-denied">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="fields" element={<AdminFields />} />
            <Route path="referees" element={<AdminReferees />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="matches" element={<AdminMatches />} />
            <Route path="matches/:matchId" element={<AdminMatchDetails />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="radio" element={<AdminRadio />} />
            <Route path="views" element={<AdminAllViews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
