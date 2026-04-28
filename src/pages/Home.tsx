import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Leaf,
  BarChart3,
  MapPin,
  ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-start bg-white">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="data:image/jpeg;base64,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"
            alt="Lush Green Agriculture"
            className="w-full h-full object-cover opacity-50 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-8 border border-emerald-500/20 backdrop-blur-sm">
                <Leaf className="h-4 w-4" />
                <span className="tracking-widest uppercase italic">مستقبل الاستثمار الزراعي</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tighter">
                استثمر في <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200">الأمن الغذائي</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-medium italic opacity-90">
                منصة حصائل تفتح لك آفاقاً جديدة للاستثمار في مزارع تقنية ذكية. 
                عائد مستدام، شفافية كاملة، وتأثير بيئي إيجابي.
              </p>

              <div className="flex flex-wrap gap-6">
                <Link to="/register">
                  <Button size="lg" className="h-16 px-10 text-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all hover:scale-105 border-0">
                    ابدأ رحلتك الآن
                  </Button>
                </Link>
                <Link to="/opportunities">
                  <Button size="lg" className="h-16 px-10 text-lg font-bold bg-white/5 hover:bg-white/10 text-white rounded-2xl backdrop-blur-md border border-white/10 transition-all">
                    تصفح الفرص المتاحة
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "إجمالي الاستثمارات", value: "+120M", sub: "ريال سعودي" },
              { label: "مزارع شريكة", value: "+45", sub: "مزرعة تقنية" },
              { label: "نمو سنوي مستهدف", value: "15%", sub: "متوسط عوائد" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md"
              >
                <p className="text-slate-400 font-bold mb-2 text-sm uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-5xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{stat.value}</h3>
                <p className="text-emerald-600 font-bold mt-2 italic">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            className="text-center mb-20 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">لماذا تختار منصة حصائل؟</h2>
             <p className="text-slate-500 text-lg font-medium italic">نحن نجمع بين الخبرة الزراعية والتقنية المالية لنقدم لك تجربة استثمارية فريدة وآمنة.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "شفافية مطلقة", desc: "تابع عمليات الري والتسميد والحصاد لحظة بلحظة عبر الصور والتقارير الميدانية المباشرة.", icon: MapPin },
              { title: "تقنية Blockchain", desc: "نستخدم تقنيات التوثيق الرقمي لضمان ملكية وتتبع كل حصة استثمارية ومنتج زراعي.", icon: TrendingUp },
              { title: "مشاريع مستدامة", desc: "نركز على تقنيات الزراعة المائية والذكية لتقليل استهلاك المياه وزيادة كفاءة الإنتاج.", icon: Leaf },
              { title: "حوكمة مالية", desc: "نطبق معايير صارمة في دراسة الجدوى وإدارة المخاطر لضمان حماية رؤوس الأموال.", icon: BarChart3 },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="editorial-card p-10 group text-start bg-slate-50/50 hover:bg-white transition-all border-transparent hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/5"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-emerald-200">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm italic">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunities Preview */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">أحدث الفرص الاستثمارية</h2>
              <p className="text-slate-500 text-lg font-medium italic">استكشف مزارعنا المختارة بعناية وابدأ في بناء محفظتك الزراعية اليوم.</p>
            </div>
            <Link to="/opportunities">
              <Button variant="ghost" className="text-emerald-700 font-bold hover:bg-emerald-50 gap-2 h-12 px-6 rounded-xl">
                عرض جميع الفرص <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: '1', title: "مزرعة العلا للحمضيات", type: "حمضيات", return: "15% - 22%", image: "https://images.unsplash.com/photo-1543831839-8588825f7787?auto=format&fit=crop&q=80&w=800" },
              { id: '2', title: "مشروع وادي الدواسر للقمح", type: "حبوب", return: "12% - 18%", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800" },
              { id: '3', title: "بيوت الجوف المحمية", type: "خضروات", return: "10% - 14%", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800" }
            ].map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group transition-all hover:shadow-xl"
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 h-8 px-4 bg-white/95 backdrop-blur-sm rounded-full flex items-center shadow-sm">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">{item.type}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">العائد المتوقع</div>
                      <div className="text-lg font-bold text-emerald-600">{item.return}</div>
                    </div>
                    <Link to={`/opportunities/${item.id}`}>
                      <Button size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all group-hover:rotate-[-45deg]">
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-emerald-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center text-white"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight">
                 جاهز لتكون جزءاً من <br /> الثورة الزراعية؟
               </h2>
               <div className="flex flex-wrap items-center justify-center gap-6">
                 <Link to="/register">
                   <Button size="lg" className="h-16 px-10 text-xl font-bold bg-white text-emerald-900 hover:bg-emerald-50 rounded-2xl shadow-2xl transition-transform hover:scale-105">
                     أنشئ حسابك المجاني
                   </Button>
                 </Link>
               </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px] -ml-48 -mb-48 opacity-50" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
