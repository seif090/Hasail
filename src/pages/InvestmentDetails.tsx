import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Droplets,
  Sprout,
  Users,
  Clock,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Leaf,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency } from "@/lib/utils";
import { auth, db, getUserProfile, handleFirestoreError, OperationType } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp, updateDoc, doc, increment } from "firebase/firestore";
import { UserProfile } from "../types";

export default function InvestmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, fetch this from Firebase
  const OPPORTUNITIES_DATA: Record<string, any> = {
    "1": {
      title: "مزرعة العلا للحمضيات",
      cropType: "برتقال، ليمون، جريب فروت",
      location: "العلا، المملكة العربية السعودية",
      duration: "18 شهر",
      expectedReturn: "15% - 22%",
      minInvestment: 5000,
      startDate: "2024-05-01",
      endDate: "2025-11-01",
      totalFunding: 1000000,
      currentFunding: 650000,
      description: "تعتبر العلا من أخصب المناطق لزراعة الحمضيات في المملكة. تهدف هذه الفرصة إلى توسعة المزرعة الحالية وإضافة أنظمة ري حديثة ذكية لزيادة الإنتاج بنسبة 40%. يتم تصدير المحصول للأسواق المحلية والإقليمية الفاخرة.",
      images: [
        "https://images.unsplash.com/photo-1543831839-8588825f7787?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1591964121966-70e6c561cb0a?auto=format&fit=crop&q=80&w=800"
      ],
      features: [
        { name: "ري ذكي", icon: Droplets },
        { name: "تسميد عضوي", icon: Sprout },
        { name: "مشغلون معتمدون", icon: Users },
        { name: "تأمين شامل", icon: ShieldCheck }
      ]
    },
    "2": {
      title: "مشروع وادي الدواسر للقمح",
      cropType: "قمح صلب (ديورم)",
      location: "وادي الدواسر، المملكة العربية السعودية",
      duration: "12 شهر",
      expectedReturn: "12% - 18%",
      minInvestment: 10000,
      startDate: "2024-06-01",
      endDate: "2025-06-01",
      totalFunding: 2500000,
      currentFunding: 1800000,
      description: "يعد وادي الدواسر سلة خبز المملكة. هذا المشروع يهدف لزراعة مساحات شاسعة من القمح عالي الجودة باستخدام تقنيات الزراعة المطرية والمحورية الموفرة للمياه، لتعزيز الأمن الغذائي الوطني.",
      images: [
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1500313830540-7b6650a7c46d?auto=format&fit=crop&q=80&w=800"
      ],
      features: [
        { name: "أمن غذائي", icon: ShieldCheck },
        { name: "محاصيل وطنية", icon: Leaf },
        { name: "تقنيات توفير المياه", icon: Droplets },
        { name: "حوكمة صارمة", icon: BarChart3 }
      ]
    },
    "3": {
      title: "بيوت الجوف المحمية",
      cropType: "طماطم، فلفل، خيار",
      location: "الجوف، المملكة العربية السعودية",
      duration: "24 شهر",
      expectedReturn: "10% - 14%",
      minInvestment: 3000,
      startDate: "2024-04-01",
      endDate: "2026-04-01",
      totalFunding: 500000,
      currentFunding: 320000,
      description: "مشروع متقدم لإنشاء بيوت محمية ذكية في منطقة الجوف، تعمل بالتحكم التلقائي في المناخ والري. نهدف لتوفير خضروات طازجة طوال العام وتقليل هدر الموارد المائية بنسبة تصل لـ 90% مقارنة بالزراعة التقليدية.",
      images: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&q=80&w=800"
      ],
      features: [
        { name: "تحكم مناخي", icon: TrendingUp },
        { name: "زراعة مائية", icon: Droplets },
        { name: "منتجات عضوية", icon: Sprout },
        { name: "استدامة بيئية", icon: Leaf }
      ]
    }
  };

  const selectedOpportunity = OPPORTUNITIES_DATA[id || "1"] || OPPORTUNITIES_DATA["1"];
  
  const item = {
    id: id || "1",
    ...selectedOpportunity
  };

  const [amount, setAmount] = useState<string>(item.minInvestment.toString());
  const [farmName, setFarmName] = useState<string>(item.title);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const balance = userProfile?.walletBalance ?? 100000;
  const remainingNeeded = item.totalFunding - item.currentFunding;

  // Real-time validation
  useEffect(() => {
    const numAmount = Number(amount);
    
    if (amount === "" || numAmount <= 0) {
      setValidationError("يرجى إدخال مبلغ استثمار صحيح.");
    } else if (numAmount < item.minInvestment) {
      setValidationError(`الحد الأدنى للاستثمار هو ${formatCurrency(item.minInvestment)}`);
    } else if (numAmount > balance) {
      setValidationError(`المبلغ يتجاوز رصيدك المتاح (${formatCurrency(balance)})`);
    } else if (numAmount > remainingNeeded) {
      setValidationError(`المبلغ يتجاوز المتبقي للتمويل (${formatCurrency(remainingNeeded)})`);
    } else {
      setValidationError(null);
    }
  }, [amount, item.minInvestment, balance, remainingNeeded]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (item) {
      setAmount(item.minInvestment.toString());
    }
  }, [item.minInvestment]);

  const handleInvest = async () => {
    setError(null);
    setSuccess(false);

    if (!auth.currentUser) {
      setError("يجب عليك تسجيل الدخول أولاً للمتابعة.");
      return;
    }

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const numAmount = Number(amount);
    
    try {
      // 1. Create investment record
      const investmentData = {
        investorId: auth.currentUser.uid,
        opportunityId: item.id,
        opportunityTitle: item.title,
        amount: numAmount,
        investedAt: serverTimestamp(),
        status: 'active'
      };
      
      const invRef = collection(db, 'investments');
      await addDoc(invRef, investmentData);
 
       // 2. Update user wallet balance (if it exists)
       if (userProfile) {
         const userRef = doc(db, 'users', auth.currentUser.uid);
         await updateDoc(userRef, {
           walletBalance: increment(-numAmount)
         });
       }
 
       setSuccess(true);
       setAmount(item.minInvestment.toString());
       
       // Update local state balance
       if (userProfile) {
         setUserProfile({
           ...userProfile,
           walletBalance: (userProfile.walletBalance ?? 100000) - numAmount
         });
       }

      // Optional: wait a bit then maybe redirect
      setTimeout(() => {
        // navigate('/dashboard');
      }, 3000);

    } catch (err: any) {
      console.error(err);
      setError("حدث خطأ أثناء محاولة إتمام الاستثمار. يرجى المحاولة مرة أخرى.");
      handleFirestoreError(err, OperationType.WRITE, 'investments');
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = (item.currentFunding / item.totalFunding) * 100;

  return (
    <div className="bg-white min-h-screen pb-20 text-start">
      {/* Back Button & Header */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <Link to="/investments" className="inline-flex items-center text-slate-500 hover:text-emerald-600 font-bold mb-8 transition-colors">
          <ArrowRight className="ml-2 h-4 w-4" />
          <span>العودة للتصنيفات</span>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">فرصة نشطة</Badge>
              <Badge variant="outline" className="text-slate-400 border-slate-100 font-medium italic">#AGRI-2024-001</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">{item.title}</h1>
            <div className="flex items-center gap-4 text-slate-500 text-lg">
              <div className="flex items-center gap-2 font-medium italic">
                <MapPin className="h-5 w-5 text-emerald-600" />
                {item.location}
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 text-center min-w-[240px] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">العائد السنوي المتوقع</span>
            <span className="text-4xl font-bold text-emerald-600">{item.expectedReturn}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl">
        {/* Left: Images & Info */}
        <div className="lg:col-span-2 space-y-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px] border border-slate-100"
          >
            <img src={item.images[0]} alt="Farm" className="w-full h-full object-cover" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {item.features.map((feature, i) => (
              <div key={i} className="flex flex-col items-center p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:scale-105">
                <feature.icon className="h-8 w-8 text-emerald-600 mb-4" />
                <span className="text-sm font-bold text-slate-900 tracking-tight">{feature.name}</span>
              </div>
            ))}
          </div>

          <section className="editorial-card border-none bg-slate-50 p-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">نظرة عامة</h2>
            <p className="text-xl text-slate-600 leading-relaxed italic font-medium">
              {item.description}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">خطة العمل والجدولة الزمنية</h2>
            <div className="space-y-8">
              {[
                { label: "مرحلة التأسيس والري", date: "أغسطس 2024", status: "completed" },
                { label: "مرحلة الزراعة والشتتلات", date: "سبتمبر 2024", status: "current" },
                { label: "مرحلة النمو والعناية", date: "أكتوبر 2024 - مايو 2025", status: "pending" },
                { label: "موسم الحصاد والتوزيع", date: "يونيو 2025", status: "pending" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-8 relative">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-md text-xl font-bold transition-all",
                    step.status === "completed" ? "bg-emerald-600 text-white" : 
                    step.status === "current" ? "bg-emerald-900 text-white" : "bg-slate-100 text-slate-400"
                  )}>
                    {i + 1}
                  </div>
                  <div className="flex-1 pb-10 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">{step.label}</h4>
                      <span className="text-sm text-slate-500 font-medium italic">{step.date}</span>
                    </div>
                    {step.status === "completed" && <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold rounded-full">تم بنجاح</Badge>}
                    {step.status === "current" && <Badge className="bg-emerald-900 text-white border-none font-bold rounded-full animate-pulse">قيد التنفيذ</Badge>}
                  </div>
                  {i < 3 && <div className="absolute top-14 right-[27px] w-0.5 h-14 bg-slate-100" />}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Investment Form Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <div className="editorial-card p-10 bg-white shadow-2xl border-slate-100 rounded-[3.5rem]">
                  <div className="flex items-center justify-between p-4 bg-linear-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 mb-6 group transition-all hover:from-emerald-100 hover:to-emerald-50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <ShieldCheck className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block mb-0.5">رصيد محفظتك</span>
                        <span className="text-lg font-black text-emerald-900 leading-none">
                          {auth.currentUser ? formatCurrency(userProfile?.walletBalance ?? 100000) : "---"}
                        </span>
                      </div>
                    </div>
                    {!auth.currentUser && (
                      <Link to="/login">
                        <Button size="sm" variant="ghost" className="text-xs font-bold text-emerald-700 hover:bg-white">دخول</Button>
                      </Link>
                    )}
                  </div>

                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">استثمر الآن</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">التمويل الحالي</span>
                           <span className="text-emerald-600 font-bold text-3xl tracking-tight">{formatCurrency(item.currentFunding)}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">من {formatCurrency(item.totalFunding)}</span>
                    </div>
                    <Progress value={progressPercent} className="h-3 rounded-full bg-slate-50" />
                    <div className="space-y-4 mb-2">
                      <div className="flex items-center gap-3 text-slate-500">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium italic">تاريخ البدء: {item.startDate}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium italic">تاريخ الانتهاء: {item.endDate}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span className="text-emerald-700">{Math.round(progressPercent)}% تم تمويله</span>
                        <div className="flex items-center gap-1">
                           <Clock className="h-3 w-3" />
                           <span>باقي 12 يوماً</span>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 block">اسم المزرعة</label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        disabled={loading || success}
                        className="w-full h-16 bg-slate-50 rounded-[1.5rem] border border-slate-100 px-8 font-bold text-xl text-slate-900 focus:bg-white focus:border-emerald-600 outline-none transition-all text-right"
                        placeholder="أدخل اسم المزرعة"
                      />
                      <Sprout className="absolute left-8 top-1/2 -translate-y-1/2 text-emerald-600 h-6 w-6 opacity-30" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 block">مبلغ الاستثمار (ر.س)</label>
                    <div className="relative">
                      <input 
                        id="investment-amount"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={amount}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setAmount(val);
                        }}
                        disabled={loading || success}
                        className={cn(
                          "w-full h-16 bg-slate-50 rounded-[1.5rem] border px-8 font-bold text-2xl focus:bg-white outline-none transition-all pr-12 text-right",
                          validationError ? "border-red-300 focus:border-red-500 text-red-600" : "border-slate-100 focus:border-emerald-600 text-slate-900"
                        )}
                        placeholder="0"
                      />
                      <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 font-bold italic text-sm">ر.س</span>
                    </div>
                    {validationError && (
                      <p className="text-[10px] text-red-500 mr-2 mt-1 font-bold italic">
                        {validationError}
                      </p>
                    )}
                    <div className="flex justify-between items-center px-1 pt-1">
                      <p className="text-[10px] text-slate-400 font-medium italic">
                        * الحد الأدنى: {formatCurrency(item.minInvestment)}
                      </p>
                      {userProfile && (
                        <p className="text-[10px] text-emerald-600 font-bold italic">
                          المتاح: {formatCurrency(userProfile.walletBalance ?? 100000)}
                        </p>
                      )}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600"
                      >
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <span className="text-sm font-bold italic">{error}</span>
                      </motion.div>
                    )}

                    {success && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-emerald-700"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                           <span className="text-sm font-bold">تم الاستثمار بنجاح!</span>
                           <span className="text-xs font-medium">يمكنك متابعة تفاصيل استثماراتك من لوحة التحكم.</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!success && (
                    <Button 
                      onClick={handleInvest}
                      disabled={loading || !!validationError}
                      className={cn(
                        "editorial-button editorial-button-primary w-full h-16 text-xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl",
                        validationError ? "opacity-50 grayscale cursor-not-allowed shadow-none" : "shadow-emerald-900/20"
                      )}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>جاري المعالجة...</span>
                        </div>
                      ) : (
                        "تأكيد الاستثمار"
                      )}
                    </Button>
                  )}

                  {success && (
                    <Link to="/dashboard">
                      <Button variant="outline" className="w-full h-16 text-xl font-bold rounded-[1.5rem] border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                        الانتقال للوحة التحكم
                      </Button>
                    </Link>
                  )}

                  <div className="pt-8 border-t border-dashed border-slate-100">
                    <div className="flex items-start gap-4 p-5 bg-emerald-50 rounded-[1.5rem] border border-emerald-100">
                      <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
                      <p className="text-xs text-emerald-800 font-medium leading-relaxed italic">
                        استثمار آمن: أموالك محمية بموجب العقود الموثقة لدى الجهات المعنية.
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
