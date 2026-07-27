import { Home, User, Users, Mail, CheckCircle, Calendar, MessageSquare } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: User, label: "Profile" },
  { icon: Users, label: "People" },
  { icon: Mail, label: "Messages" },
  { icon: CheckCircle, label: "Tasks" },
  { icon: Calendar, label: "Calendar" },
  { icon: MessageSquare, label: "Chat" },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col items-center gap-1 bg-primary py-4 px-1.5 w-12 shrink-0">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
            item.active
              ? "bg-sidebar-active text-sidebar-active-foreground"
              : "text-primary-foreground/80 hover:bg-primary-foreground/10"
          }`}
          title={item.label}
        >
          <item.icon size={18} />
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
