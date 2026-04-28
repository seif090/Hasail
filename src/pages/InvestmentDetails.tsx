import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  BarChart3,
  Droplets,
  Sprout,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function InvestmentDetails() {
  const { id } = useParams();

  // In a real app, fetch this from Firebase
  const item = {
    id: id || "1",
    title: "مزرعة حمضيات الوادي",
    cropType: "برتقال، ليمون، جريب فروت",
    location: "العلا، المملكة العربية السعودية",
    duration: "18 شهر",
    expectedReturn: "15% - 22%",
    minInvestment: 5000,
    totalFunding: 1000000,
    currentFunding: 650000,
    description: "تعتبر العلا من أخصب المناطق لزراعة الحمضيات في المملكة. تهدف هذه الفرصة إلى توسعة المزرعة الحالية وإضافة أنظمة ري حديثة ذكية لزيادة الإنتاج بنسبة 40%. يتم تصدير المحصول للأسواق المحلية والإقليمية الفاخرة.",
    images: [
      "https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
    ],
    features: [
      { name: "ري ذكي", icon: Droplets },
      { name: "تسميد عضوي", icon: Sprout },
      { name: "مشغلون معتمدون", icon: Users },
      { name: "تأمين شامل", icon: ShieldCheck }
    ]
  };

  const progressPercent = (item.currentFunding / item.totalFunding) * 100;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Back Button & Header */}
      <div className="container mx-auto px-6 py-8">
        <Link to="/investments" className="inline-flex items-center text-neutral-500 hover:text-primary font-bold mb-8 transition-colors">
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة للتصنيفات
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-primary/10 text-primary border-none font-bold">فرصة نشطة</Badge>
              <Badge variant="outline" className="text-neutral-400 border-neutral-200">#AGRI-2024-001</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-2">{item.title}</h1>
            <div className="flex items-center gap-4 text-neutral-500 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {item.location}
              </div>
            </div>
          </div>
          <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 text-center min-w-[200px]">
            <span className="text-xs font-bold text-neutral-400 block mb-1">العائد السنوي المتوقع</span>
            <span className="text-3xl font-black text-primary">{item.expectedReturn}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Images & Info */}
        <div className="lg:col-span-2 space-y-12 text-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px]"
          >
            <img src={item.images[0]} alt="Farm" className="w-full h-full object-cover" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {item.features.map((feature, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100 italic transition-all hover:bg-white hover:shadow-lg">
                <feature.icon className="h-8 w-8 text-primary mb-3" />
                <span className="text-sm font-bold text-neutral-900">{feature.name}</span>
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-2xl font-black text-neutral-900 mb-4">نظرة عامة</h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {item.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-900 mb-6">خطة العمل والجدولة الزمنية</h2>
            <div className="space-y-6">
              {[
                { label: "مرحلة التأسيس والري", date: "أغسطس 2024", status: "completed" },
                { label: "مرحلة الزراعة والشتتلات", date: "سبتمبر 2024", status: "current" },
                { label: "مرحلة النمو والعناية", date: "أكتوبر 2024 - مايو 2025", status: "pending" },
                { label: "موسم الحصاد والتوزيع", date: "يونيو 2025", status: "pending" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-6 relative">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm",
                    step.status === "completed" ? "bg-primary text-white" : 
                    step.status === "current" ? "bg-accent text-white" : "bg-neutral-200 text-neutral-400"
                  )}>
                    {i + 1}
                  </div>
                  <div className="flex-1 pb-6 border-b border-neutral-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-neutral-900">{step.label}</h4>
                      <span className="text-sm text-neutral-500">{step.date}</span>
                    </div>
                    {step.status === "completed" && <Badge className="bg-emerald-50 text-emerald-600 border-none">تم بنجاح</Badge>}
                    {step.status === "current" && <Badge className="bg-primary/10 text-primary border-none animate-pulse">قيد التنفيذ</Badge>}
                  </div>
                  {i < 3 && <div className="absolute top-12 right-[23px] w-0.5 h-12 bg-neutral-100" />}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Investment Form Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <Card className="border-none shadow-2xl rounded-[3rem] p-8 bg-white border border-neutral-100">
              <CardContent className="p-0">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-neutral-900 mb-6">استثمر الآن</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-primary font-black text-2xl">{item.currentFunding.toLocaleString()} ر.س</span>
                        <span className="text-xs font-bold text-neutral-400">من {item.totalFunding.toLocaleString()} ر.س</span>
                    </div>
                    <Progress value={progressPercent} className="h-3 rounded-full bg-neutral-100" />
                    <div className="flex justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        <span>{Math.round(progressPercent)}% فد تم تمويله</span>
                        <span>باقي 12 يوماً</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-neutral-400 uppercase mr-2">مبلغ الاستثمار (ر.س)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        defaultValue={item.minInvestment}
                        className="w-full h-14 bg-neutral-50 rounded-2xl border-2 border-neutral-100 px-6 font-black text-xl focus:border-primary outline-none transition-all"
                      />
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">SAR</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mr-2 mt-1 italic">
                      * الحد الأدنى للاستثمار هو {item.minInvestment.toLocaleString()} ر.س
                    </p>
                  </div>

                  <Button className="w-full h-16 text-xl font-black rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25">
                    تأكيد الاستثمار
                  </Button>

                  <div className="pt-6 border-t border-dashed border-neutral-200">
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl">
                      <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                      <p className="text-xs text-emerald-800 font-bold leading-relaxed">
                        استثمار آمن: أموالك محمية بموجب العقود الموثقة لدى وزارة الموارد والزراعة.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
