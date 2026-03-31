import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users, Activity, MessageCircle, FileText, Settings, LogOut, Heart,
  TrendingUp, TrendingDown, BarChart3, AlertCircle, CheckCircle, Clock,
  Search, ChevronDown, MoreHorizontal, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stats = [
  { label: "Total Users", value: "24,583", change: "+12.5%", up: true, icon: Users },
  { label: "Health Checks Today", value: "1,847", change: "+8.2%", up: true, icon: Activity },
  { label: "AI Chat Sessions", value: "3,291", change: "+15.3%", up: true, icon: MessageCircle },
  { label: "Critical Alerts", value: "23", change: "-5.1%", up: false, icon: AlertCircle },
];

const recentUsers = [
  { id: "U-001", name: "Alice Cooper", email: "alice@mail.com", status: "active", checks: 12, joined: "2026-03-28" },
  { id: "U-002", name: "Bob Martinez", email: "bob@mail.com", status: "active", checks: 8, joined: "2026-03-27" },
  { id: "U-003", name: "Carol Davis", email: "carol@mail.com", status: "inactive", checks: 3, joined: "2026-03-25" },
  { id: "U-004", name: "David Lee", email: "david@mail.com", status: "active", checks: 21, joined: "2026-03-24" },
  { id: "U-005", name: "Eva Green", email: "eva@mail.com", status: "flagged", checks: 45, joined: "2026-03-22" },
  { id: "U-006", name: "Frank Wilson", email: "frank@mail.com", status: "active", checks: 6, joined: "2026-03-20" },
];

const recentChats = [
  { user: "Alice Cooper", topic: "Chest pain symptoms", messages: 8, status: "resolved", date: "2026-03-31" },
  { user: "Bob Martinez", topic: "Migraine frequency", messages: 12, status: "ongoing", date: "2026-03-31" },
  { user: "Eva Green", topic: "Anxiety management", messages: 15, status: "escalated", date: "2026-03-30" },
  { user: "David Lee", topic: "Diet recommendations", messages: 6, status: "resolved", date: "2026-03-30" },
];

const sidebarLinks = [
  { label: "Dashboard", icon: BarChart3, active: true },
  { label: "Users", icon: Users },
  { label: "Health Checks", icon: Activity },
  { label: "AI Chats", icon: MessageCircle },
  { label: "Articles", icon: FileText },
  { label: "Settings", icon: Settings },
];

const statusColor = (s: string) =>
  s === "active" || s === "resolved" ? "bg-primary/10 text-primary border-primary/20"
  : s === "flagged" || s === "escalated" ? "bg-destructive/10 text-destructive border-destructive/20"
  : s === "ongoing" ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
  : "bg-muted text-muted-foreground";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} border-r border-border bg-card transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          {sidebarOpen && <span className="font-heading text-lg font-bold">Admin</span>}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                link.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{link.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Link to="/">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all">
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Back to Site</span>}
            </button>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="border-b border-border px-6 py-4 flex items-center justify-between glass">
          <div>
            <h1 className="font-heading text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <ChevronDown className={`w-4 h-4 transition-transform ${sidebarOpen ? "rotate-90" : "-rotate-90"}`} />
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 shadow-soft"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-primary" : "text-destructive"}`}>
                    {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {s.change}
                  </div>
                </div>
                <div className="font-heading text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users">
            <TabsList className="glass">
              <TabsTrigger value="users" className="gap-2"><Users className="w-4 h-4" /> Users</TabsTrigger>
              <TabsTrigger value="chats" className="gap-2"><MessageCircle className="w-4 h-4" /> AI Chats</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <div className="glass rounded-2xl shadow-soft overflow-hidden">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-9 h-9" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Health Checks</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{u.name}</div>
                            <div className="text-xs text-muted-foreground">{u.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColor(u.status)}>{u.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{u.checks}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{u.joined}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="chats" className="mt-6">
              <div className="glass rounded-2xl shadow-soft overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentChats.map((c, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-sm">{c.user}</TableCell>
                        <TableCell className="text-sm">{c.topic}</TableCell>
                        <TableCell className="text-sm">{c.messages}</TableCell>
                        <TableCell>
                          <Badge className={statusColor(c.status)}>{c.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{c.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
