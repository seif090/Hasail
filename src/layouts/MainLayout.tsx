import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home as HomeIcon, 
  TrendingUp, 
  LayoutDashboard, 
  Menu, 
  User as UserIcon, 
  Leaf,
  LogOut,
  ChevronLeft,
  ChevronDown
} from "lucide-react";
import { Button } from "../components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "../components/ui/sheet";
import { auth, getUserProfile } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { UserProfile } from "../types";
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const NavItems = [
  { name: "الرئيسية", path: "/", icon: HomeIcon },
  { name: "فرص الاستثمار", path: "/investments", icon: TrendingUp },
  { name: "لوحة التحكم", path: "/dashboard", icon: LayoutDashboard },
];

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger 
                render={
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                } 
              />
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full border-r bg-white">
                  <div className="flex h-16 items-center border-b px-6 gap-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold text-primary">حصائل</span>
                  </div>
                  <nav className="flex-1 space-y-1 p-4">
                    {NavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          location.pathname === item.path
                            ? "bg-primary text-white"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-primary"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-emerald-900">حصائل</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-emerald-600",
                  location.pathname === item.path ? "text-emerald-700 underline underline-offset-8" : "text-slate-500"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="h-10 w-24 animate-pulse bg-slate-100 rounded-full" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" className="relative h-10 w-auto flex items-center gap-2 px-2 rounded-full hover:bg-slate-50 border border-slate-200">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                        <AvatarFallback className="bg-emerald-50 text-emerald-600 font-bold">
                          {user.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-block text-sm font-semibold text-slate-700">{user.displayName}</span>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-slate-100 bg-white">
                  <div className="px-3 py-2">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">نوع الحساب</p>
                    <p className="text-sm font-bold text-emerald-700">{user.role === 'investor' ? 'مستثمر' : user.role === 'operator' ? 'مشغل' : 'مسؤول'}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-50" />
                  <DropdownMenuItem 
                    render={
                      <Link to="/dashboard" className="rounded-xl focus:bg-slate-50 cursor-pointer p-3 font-semibold text-slate-700 flex items-center gap-3">
                        <LayoutDashboard className="h-4 w-4" />
                        لوحة التحكم
                      </Link>
                    }
                  />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl focus:bg-red-50 focus:text-red-600 font-semibold cursor-pointer p-3 gap-3">
                    <LogOut className="h-4 w-4" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login" className="hidden sm:inline-block">
                  <Button variant="ghost" className="font-semibold text-slate-600">تسجيل الدخول</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl px-6 shadow-lg shadow-emerald-200/50 transition-all">
                    ابدأ الاستثمار
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">حصائل</span>
          </div>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            منصة "حصائل" تهدف لتمكين المستثمرين من الوصول للفرص الزراعية الواعدة والمشاركة في تنمية القطاع الزراعي بشكل ذكي ومربح.
          </p>
          <div className="mt-8 border-t pt-8 text-xs text-neutral-400">
            © {new Date().getFullYear()} منصة حصائل. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
