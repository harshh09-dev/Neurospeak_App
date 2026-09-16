import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MessageSquare, MapPin, Bell, UserCircle, Users, MessagesSquare, Moon, Sun, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNotifications } from "@/contexts/NotificationContext";
import { useApp } from "@/contexts/AppContext";
import { haptics } from "@/lib/haptics";
import { Button } from "@/components/ui/button";
import logo from "@/assets/neurospeak-logo.png";

interface MobileLayoutProps {
  children: ReactNode;
  role: "user" | "caregiver";
}

const userTabs = [
  { path: "/user", icon: Home, label: "Home" },
  { path: "/user/communicate", icon: MessageSquare, label: "Talk" },
  { path: "/user/chat", icon: MessagesSquare, label: "Chat" },
  { path: "/user/tracking", icon: ShieldAlert, label: "Safety" },
  { path: "/user/profile", icon: UserCircle, label: "Profile" },
];

const caregiverTabs = [
  { path: "/caregiver", icon: Home, label: "Dashboard" },
  { path: "/caregiver/tracking", icon: Users, label: "Connections" },
  { path: "/caregiver/chat", icon: MessagesSquare, label: "Chat" },
  { path: "/caregiver/alerts", icon: ShieldAlert, label: "Safety" },
  { path: "/caregiver/profile", icon: UserCircle, label: "Profile" },
];

const MobileLayout = ({ children, role }: MobileLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount, setShowPanel } = useNotifications();
  const { isDarkMode, toggleDarkMode } = useApp();
  const tabs = role === "caregiver" ? caregiverTabs : userTabs;

  return (
    <div className="h-dvh min-h-0 overflow-hidden bg-background lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="hidden border-r border-sidebar-border bg-sidebar px-3 py-5 lg:flex lg:min-h-0 lg:flex-col" aria-label={`${role === "caregiver" ? "Caregiver" : "Communicator"} navigation`}>
        <div className="flex items-center gap-3 px-2 pb-7">
          <img src={logo} alt="" className="h-9 w-9" />
          <div><p className="font-bold text-sidebar-foreground">NeuroSpeak</p><p className="text-xs text-muted-foreground">{role === "caregiver" ? "Caregiver" : "Communicator"}</p></div>
        </div>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return <Button key={tab.path} variant="ghost" onClick={() => navigate(tab.path)} className={cn("w-full justify-start", isActive && "bg-sidebar-accent text-sidebar-accent-foreground")} aria-current={isActive ? "page" : undefined}><tab.icon />{tab.label}</Button>;
          })}
        </nav>
        <div className="mt-auto flex gap-2 border-t border-sidebar-border pt-4">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label={isDarkMode ? "Use light mode" : "Use dark mode"}>{isDarkMode ? <Sun /> : <Moon />}</Button>
          <Button variant="ghost" className="flex-1 justify-start" onClick={() => setShowPanel(true)}><Bell /> Notifications{unreadCount > 0 && <span className="ml-auto rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">{unreadCount}</span>}</Button>
        </div>
      </aside>

      <section className="flex h-dvh min-h-0 min-w-0 flex-col overflow-hidden">
      <header className="flex min-h-[var(--app-header-height)] shrink-0 items-center justify-between border-b border-border bg-background/95 px-[max(1rem,var(--safe-left))] pt-[var(--safe-top)] backdrop-blur lg:hidden">
        <div className="flex min-w-0 items-center gap-2"><img src={logo} alt="" className="h-8 w-8" /><span className="truncate font-bold">NeuroSpeak</span></div>
        <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            haptics.light();
            toggleDarkMode();
          }}
          aria-label={isDarkMode ? "Use light mode" : "Use dark mode"}
        >
          <motion.div
            key={isDarkMode ? "dark" : "light"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-warning" />
            ) : (
              <Moon className="h-4 w-4 text-foreground" />
            )}
          </motion.div>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            haptics.light();
            setShowPanel(true);
          }}
          className="relative"
          aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
        >
          <Bell className="h-4.5 w-4.5 text-foreground" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-destructive flex items-center justify-center"
            >
              <span className="text-[10px] font-bold text-destructive-foreground">{unreadCount}</span>
            </motion.div>
          )}
        </Button>
        </div>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-[calc(var(--app-nav-height)+var(--safe-bottom))] lg:pb-0">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-[max(0.25rem,var(--safe-left))] pb-[var(--safe-bottom)] backdrop-blur-lg lg:hidden" aria-label="Primary navigation">
        <div className="mx-auto flex h-[var(--app-nav-height)] max-w-2xl justify-around">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Button
                variant="ghost"
                key={tab.path}
                onClick={() => {
                  haptics.light();
                  navigate(tab.path);
                }}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative",
                  isActive ? "text-primary" : "text-muted-foreground active:scale-95"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-1.5 w-5 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative">
                  <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                </div>
                <span className={cn("text-xs", isActive ? "font-bold" : "font-medium")}>{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
      </section>
    </div>
  );
};

export default MobileLayout;
