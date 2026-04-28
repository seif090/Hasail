import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Map as MapIcon, 
  ShieldCheck, 
  ChevronLeft,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-bold text-primary mb-6 w-fit">
              <TrendingUp className="h-4 w-4" />
              أرباح ذكية من الطبيعة
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-neutral-900 leading-[1.1] mb-6">
              استثمر في <span className="text-primary tracking-tighter italic">مزارع المستقبل</span> وأنت في مكانك
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-lg leading-relaxed">
              منصة حصائل تفتح لك آفاق الاستثمار الزراعي الرقمي. تابع نمو محاصيلك وشاهد عمليات الإنتاج لحظة بلحظة وبكل شفافية.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-primary/25">
                  ابدأ رحلتك الآن
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/investments">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl border-2">
                  اكتشف الفرص
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
              alt="Agriculture" 
              className="relative rounded-[2.5rem] shadow-2xl border-8 border-white object-cover aspect-video lg:aspect-square"
            />
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-neutral-100 hidden sm:block">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">إجمالي المساحات</span>
                <span className="text-2xl font-black text-primary">+12,000 هكتار</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-24">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-black text-neutral-900 mb-4">لماذا تستثمر عبر حصائل؟</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">
            نوفر لك تجربة استثمارية متكاملة تجمع بين سهولة التكنولوجيا وعراقة الزراعة.
          </p>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "متابعة مباشرة",
              desc: "صور وفيديوهات دورية لعمليات الري والتسميد والحصاد لمزرعتك.",
              icon: MapIcon,
              color: "bg-blue-50 text-blue-600"
            },
            {
              title: "عوائد مجزية",
              desc: "دراسات جدوى دقيقية لضمان أفضل عوائد على استثمارك الزراعي.",
              icon: TrendingUp,
              color: "bg-emerald-50 text-emerald-600"
            },
            {
              title: "شفافية وأمان",
              desc: "عقود قانونية موثقة ونظام رقابة صارم لضمان حقوق كافة الأطراف.",
              icon: ShieldCheck,
              color: "bg-amber-50 text-amber-600"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2rem] shadow-sm border border-neutral-100 text-center"
            >
              <div className={cn("w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6", feature.color)}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Teaser CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[3rem] p-12 lg:p-20 relative overflow-hidden flex flex-col items-center text-center text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 blur-[120px] -ml-48 -mb-48 rounded-full" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative z-10 max-w-2xl"
            >
              <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                جاهز لتكون جزءاً من <br /> الثورة الزراعية؟
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link to="/register">
                  <Button size="lg" className="h-16 px-10 text-xl font-bold bg-white text-primary hover:bg-neutral-100 rounded-2xl shadow-2xl">
                    أنشئ حسابك المجاني
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="w-10 h-10 rounded-full border-2 border-primary bg-neutral-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${n}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white/80">+1,200 مستثمر انضموا إلينا</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
