import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Leaf, 
  ArrowRight, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError("فشل تسجيل الدخول عبر جوجل.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left: Decorative/Info Side (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-primary relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-16 underline-offset-4 hover:underline">
            <ArrowRight className="h-5 w-5" />
            <span className="font-bold">العودة للرئيسية</span>
          </Link>
          
          <h2 className="text-6xl font-black leading-tight mb-8">
            مرحباً بك مجدداً <br /> في <span className="text-accent underline decoration-accent/30">حصائل</span>
          </h2>
          <p className="text-xl text-white/80 max-w-sm font-bold leading-relaxed">
            استمر في متابعة نمو مزارعك وعوائدك الاستثمارية من خلال لوحة تحكمك الذكية.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-6">
           <Card className="bg-white/10 border-white/20 backdrop-blur-md rounded-3xl p-6 text-white max-w-md">
              <p className="font-bold mb-4 italic leading-relaxed">
                "أفضل ما في حصائل هو الشفافية. أستطيع رؤية صورة شتلاتي وهي تنمو يومياً وكأنني في المزرعة."
              </p>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-accent/30" />
                 <div className="flex flex-col">
                    <span className="text-sm font-black">عبدالله المقرن</span>
                    <span className="text-xs text-white/60">مستثمر فضي</span>
                 </div>
              </div>
           </Card>
        </div>
      </div>

      {/* Right: Login Form Side */}
      <div className="flex items-center justify-center p-8 lg:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8 text-start"
        >
          <div className="text-start">
            <h1 className="text-3xl font-black text-neutral-900 mb-2">تسجيل الدخول</h1>
            <p className="text-neutral-500 font-bold">أدخل بياناتك للوصول إلى محفظتك الزراعية</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 italic">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-black text-neutral-400 uppercase tracking-widest mr-1">البريد الإلكتروني</Label>
              <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pr-12 rounded-2xl border-neutral-100 bg-neutral-50 focus:bg-white transition-all shadow-sm"
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-300" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mr-1">
                <Label htmlFor="password" className="text-xs font-black text-neutral-400 uppercase tracking-widest">كلمة المرور</Label>
                <Link to="#" className="text-xs font-bold text-primary hover:underline">نسيت كلمة المرور؟</Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pr-12 rounded-2xl border-neutral-100 bg-neutral-50 focus:bg-white transition-all shadow-sm"
                  required
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-300" />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-black rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25">
              {loading ? "جاري الدخول..." : "دخول"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-neutral-400 font-bold">أو من خلال</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button onClick={handleGoogleLogin} variant="outline" className="h-14 rounded-2xl font-bold border-neutral-100 bg-neutral-50 hover:bg-white">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="ml-3 h-5 w-5" />
              المتابعة باستخدام جوجل
            </Button>
          </div>

          <p className="text-center text-sm text-neutral-500 font-bold mt-10">
            لا تملك حساباً؟{" "}
            <Link to="/register" className="text-primary hover:underline font-black">
              أنشئ حساباً جديداً
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
