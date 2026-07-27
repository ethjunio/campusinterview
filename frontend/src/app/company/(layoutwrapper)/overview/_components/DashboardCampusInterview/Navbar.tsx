import { HelpCircle } from "lucide-react";
import campusLogo from "@/assets/campus-logo.png";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-card px-4 py-3 md:px-6 border-b border-border">
      <div className="flex items-center gap-2">
        <img src={"/img/logo.svg"} alt="Campus Interview" className="h-8 w-8 rounded-full object-cover" />
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-primary">Campus Interview</p>
          <p className="text-[10px] text-muted-foreground">organized by ETH juniors</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a href="#" className="hidden sm:inline text-sm text-primary hover:underline">
          Join our online event in May →
        </a>
        <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">Log Out</span>
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-primary">
          <HelpCircle size={18} />
        </button>
        <button className="flex flex-col gap-1 md:hidden px-1">
          <span className="block h-0.5 w-5 bg-foreground"></span>
          <span className="block h-0.5 w-5 bg-foreground"></span>
          <span className="block h-0.5 w-5 bg-foreground"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
