import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Leaf, 
  ArrowRight, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { auth, createUserProfile } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserRole } from "../types";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(userCredential.user.uid, email, name, UserRole.INVESTOR);
        navigate("/dashboard");
      } catch (err: any) {
        setError(err.message || "فشل إنشاء الحساب.");
        setStep(1); // Go back to first step to fix errors if any
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left: Decorative/Info Side (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-neutral-900 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10 pointer-events-none invert" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-16 underline-offset-4 hover:underline">
            <ArrowRight className="h-5 w-5" />
            <span className="font-bold">العودة للرئيسية</span>
          </Link>
          
          <h2 className="text-6xl font-black leading-tight mb-8">
            كن شريكاً في <br /> <span className="text-primary">موسم الحصاد</span> القادم
          </h2>
          <p className="text-xl text-neutral-400 max-w-sm font-bold leading-relaxed">
            انضم لأكثر من 1,200 مستثمر بدأوا رحلتهم في تملك حصص من أخصب المزارع في المنطقة.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
           <div className="flex items-center gap-6">
              {[
                { title: "أمان عالي", desc: "عقود ذكية وموثقة" },
                { title: "شفافية", desc: "متابعة حية للمزرعة" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-2">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-black text-white">{item.title}</span>
                  <span className="text-xs text-neutral-500 font-bold">{item.desc}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Right: Register Form Side */}
      <div className="flex items-center justify-center p-8 lg:p-16 bg-neutral-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8 text-start"
        >
          <Card className="border-none shadow-2xl rounded-[3rem] p-10 bg-white border border-neutral-100">
            <div className="text-start mb-8">
              <h1 className="text-2xl font-black text-neutral-900 mb-2">إنشاء حساب جديد</h1>
              <p className="text-neutral-500 text-sm font-bold">ابدأ استثمارك الزراعي في دقائق معدودة</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 mb-8 pr-1">
               <div className={cn("h-1.5 flex-1 rounded-full bg-primary", step === 1 ? "opacity-100" : "opacity-30")} />
               <div className={cn("h-1.5 flex-1 rounded-full bg-primary", step === 2 ? "opacity-100" : "opacity-30")} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 italic">
                  {error}
                </div>
              )}
              {step === 1 ? (
                <>
                  <div className="space-y-2 text-start">
                    <Label className="text-xs font-black text-neutral-400 uppercase tracking-widest mr-1">الاسم الكامل</Label>
                    <div className="relative">
                      <Input 
                        placeholder="أدخل اسمك الثلاثي" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-14 pr-12 rounded-2xl border-neutral-100 bg-neutral-50 focus:bg-white transition-all"
                        required
                      />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-300" />
                    </div>
                  </div>

                  <div className="space-y-2 text-start">
                    <Label className="text-xs font-black text-neutral-400 uppercase tracking-widest mr-1">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Input 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pr-12 rounded-2xl border-neutral-100 bg-neutral-50 focus:bg-white transition-all"
                        required
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-300" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2 text-start">
                    <Label className="text-xs font-black text-neutral-400 uppercase tracking-widest mr-1">كلمة المرور</Label>
                    <div className="relative">
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 pr-12 rounded-2xl border-neutral-100 bg-neutral-50 focus:bg-white transition-all"
                        required
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-300" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-start gap-3">
                       <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5" />
                       <span className="text-xs text-emerald-800 font-bold leading-relaxed">
                          بإنشائك للحساب، أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بالاستثمار الزراعي عن بعد.
                       </span>
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-black rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 transition-all">
                {loading ? "جاري المعالجة..." : (step === 1 ? "التالي" : "إنشاء الحساب")}
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
              </Button>
              
              {step === 2 && (
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm font-bold text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  العودة للخطوة السابقة
                </button>
              )}
            </form>
          </Card>

          <p className="text-center text-sm text-neutral-500 font-bold mt-8">
            تملك حساباً بالفعل؟{" "}
            <Link to="/login" className="text-primary hover:underline font-black">
              سجل دخولك هنا
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
