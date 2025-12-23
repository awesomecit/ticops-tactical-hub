import React from 'react';
import { BarChart3, Users, Crosshair, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const dailyActiveUsers = [
  { day: 'Lun', users: 245 },
  { day: 'Mar', users: 312 },
  { day: 'Mer', users: 287 },
  { day: 'Gio', users: 356 },
  { day: 'Ven', users: 421 },
  { day: 'Sab', users: 534 },
  { day: 'Dom', users: 478 },
];

const matchesPerDay = [
  { day: 'Lun', matches: 12 },
  { day: 'Mar', matches: 18 },
  { day: 'Mer', matches: 15 },
  { day: 'Gio', matches: 22 },
  { day: 'Ven', matches: 28 },
  { day: 'Sab', matches: 45 },
  { day: 'Dom', matches: 38 },
];

const userDistribution = [
  { name: 'Bronze', value: 320, color: '#CD7F32' },
  { name: 'Silver', value: 280, color: '#C0C0C0' },
  { name: 'Gold', value: 180, color: '#FFD700' },
  { name: 'Platinum', value: 85, color: '#E5E4E2' },
  { name: 'Diamond', value: 35, color: '#B9F2FF' },
];

const topLocations = [
  { name: 'Campo Alpha Zone', matches: 156, rating: 4.8 },
  { name: 'Battleground Milano', matches: 134, rating: 4.6 },
  { name: 'Arena Tattica Roma', matches: 98, rating: 4.7 },
  { name: 'Night Ops Arena', matches: 87, rating: 4.5 },
  { name: 'Urban Warfare Center', matches: 76, rating: 4.4 },
];

const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Statistiche e metriche della piattaforma</p>
        </div>
        <Select defaultValue="7d">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Ultime 24h</SelectItem>
            <SelectItem value="7d">Ultimi 7 giorni</SelectItem>
            <SelectItem value="30d">Ultimi 30 giorni</SelectItem>
            <SelectItem value="90d">Ultimi 90 giorni</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-xs text-muted-foreground">Utenti Attivi</p>
              <p className="text-xs text-green-500">+12.5%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Crosshair className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">178</p>
              <p className="text-xs text-muted-foreground">Partite Giocate</p>
              <p className="text-xs text-green-500">+8.3%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-muted-foreground">Nuove Iscrizioni</p>
              <p className="text-xs text-green-500">+23.1%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">47m</p>
              <p className="text-xs text-muted-foreground">Tempo Medio Sessione</p>
              <p className="text-xs text-green-500">+5.2%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Utenti Attivi Giornalieri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyActiveUsers}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Matches Per Day */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crosshair className="h-5 w-5 text-primary" />
              Partite per Giorno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={matchesPerDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="matches" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {userDistribution.map((tier) => (
                <Badge
                  key={tier.name}
                  variant="outline"
                  className="gap-1"
                  style={{ borderColor: tier.color, color: tier.color }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                  {tier.name}: {tier.value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Campi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLocations.map((location, index) => (
                <div
                  key={location.name}
                  className="flex items-center gap-4"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{location.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {location.matches} partite • ⭐ {location.rating}
                    </p>
                  </div>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(location.matches / topLocations[0].matches) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
