import React from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  MapPin, 
  Clock, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  CloudSun,
  Droplets,
  Sprout,
  Users,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Leaf
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { cn, formatCurrency } from "../lib/utils";

const MOCK_STATS = [
  { label: "إجمالي الاستثمارات", value: 45000, icon: TrendingUp, trend: "+12.4%" },
  { label: "الأرباح المتولدة", value: 3200, icon: BarChart3, trend: "+8.2%" },
  { label: "المشاريع النشطة", value: 4, icon: Leaf, trend: "استقرار" },
  { label: "المساحة المزروعة", value: "12 هكتار", icon: MapPin, trend: "+20%" },
];

const INVESTMENT_DATA = [
  { name: 'يناير', investment: 5000, returns: 0 },
  { name: 'فبراير', investment: 8000, returns: 100 },
  { name: 'مارس', investment: 15000, returns: 450 },
  { name: 'أبريل', investment: 30000, returns: 1200 },
  { name: 'مايو', investment: 45000, returns: 3200 },
];

const DISTRIBUTION_DATA = [
  { name: 'حمضيات', value: 40, color: '#10b981' },
  { name: 'خضروات', value: 30, color: '#34d399' },
  { name: 'حبوب', value: 20, color: '#059669' },
  { name: 'أخرى', value: 10, color: '#064e3b' },
];

const NEWS_TICKER = [
  "ارتفاع الطلب العالمي على القمح الصلب بنسبة 4%.",
  "افتتاح أضخم مزرعة مائية في منطقة الجوف الشهر القادم.",
  "وزارة الزراعة تطلق مبادرة دعم التقنيات الذكية للمزارع الصغيرة.",
  "نجاح تجربة زراعة الأنواع النادرة من الموالح في وادي الدواسر."
];

const MOCK_TIMELINE = [
  {
    id: "1",
    type: "irrigation",
    title: "بدء عملية الري المحوري",
    plot: "القطاع A-1",
    time: "منذ ساعتين",
    operator: "أحمد منصور",
    status: "completed",
    notes: "تم استخدام نظام الري بالتنقيط المتصل بمجسات التربة. نسبة الرطوبة الحالية 75%.",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600",
    icon: "💧"
  },
  {
    id: "2",
    type: "fertilization",
    title: "تسميد عضوي دوري",
    plot: "القطاع C-3",
    time: "أمس، 4:30 م",
    operator: "سليمان العتيبي",
    status: "completed",
    notes: "إضافة الدفعة الثانية من السماد المحفز للنمو الخضري لزيادة جودة الثمار.",
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=600",
    icon: "🧪"
  },
  {
    id: "3",
    type: "photo",
    title: "تحديث الحالة المصورة",
    plot: "مزارع الزيتون",
    time: "15 أكتوبر",
    operator: "فهد الشهري",
    status: "completed",
    notes: "نمو البراعم يسير بشكل ممتاز وفق الخطة الزمنية المعتمدة.",
    image: "https://images.unsplash.com/photo-1592398514532-690227918f69?auto=format&fit=crop&q=80&w=600",
    icon: "📸"
  }
];

import { auth, getUserProfile } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { UserProfile, UserRole } from "../types";

export default function Dashboard() {
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const userRole = userProfile?.role || UserRole.INVESTOR;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* News Ticker */}
        <div className="mb-8 bg-emerald-900 text-emerald-50 px-4 py-2 rounded-2xl flex items-center gap-4 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">أخبار حصائل</span>
          </div>
          <div className="flex-1 whitespace-nowrap overflow-hidden">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-12 font-medium italic text-xs"
            >
              {NEWS_TICKER.map((news, i) => (
                <span key={i}>{news}</span>
              ))}
              {NEWS_TICKER.map((news, i) => (
                <span key={`dup-${i}`}>{news}</span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="text-start">
             <h1 className="text-3xl font-bold text-slate-900 mb-1">لوحة الاستثمار</h1>
             <p className="text-slate-500 font-medium italic">مرحباً بك مجدداً، {userProfile?.displayName || "مستثمر حصائل"}</p>
          </div>
          
          <div className="flex gap-3">
             <Button className="editorial-button editorial-button-primary">
                فرص جديدة
             </Button>
             <Button variant="outline" className="editorial-button bg-white border-slate-200 text-slate-700">
                تقارير PDF
             </Button>
          </div>
        </div>

        {userRole === 'investor' ? (
          <div className="space-y-8 text-start">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: "إجمالي الاستثمارات", 
                  value: 45000, 
                  icon: TrendingUp, 
                  trend: "+12.4%" 
                },
                { 
                  label: "الأرباح المتولدة", 
                  value: 3200, 
                  icon: BarChart3, 
                  trend: "+8.2%" 
                },
                { 
                  label: "المشاريع النشطة", 
                  value: 4, 
                  icon: Leaf, 
                  trend: "استقرار" 
                },
                { 
                  label: "المساحة المزروعة", 
                  value: "12 هكتار", 
                  icon: MapPin, 
                  trend: "+20%" 
                },
              ].map((stat, i) => (
                <div key={i} className="editorial-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                    {stat.trend && (
                      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">
                        {stat.trend}
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
                  </h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Chart Card */}
              <div className="lg:col-span-2 editorial-card p-8">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-xl font-bold text-slate-900">نمو عوائد المحاصيل</h4>
                  <span className="text-xs text-emerald-600 font-bold cursor-pointer hover:underline">التفاصيل</span>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={INVESTMENT_DATA}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{fontWeight: 700, marginBottom: '5px'}}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="investment" 
                        stroke="#059669" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Added: Sustainability Impact */}
                <div className="mt-10 pt-8 border-t border-slate-100">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                         <Leaf className="h-6 w-6" />
                      </div>
                      <h5 className="font-bold text-slate-900 tracking-tight">أثرك البيئي المستدام</h5>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50/50 rounded-2xl text-center border border-slate-50">
                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">توفير مياه</p>
                         <p className="text-lg font-bold text-slate-900 font-mono tracking-tighter">14,200 <span className="text-xs">لتر</span></p>
                      </div>
                      <div className="p-4 bg-slate-50/50 rounded-2xl text-center border border-slate-50">
                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">عزل كربون</p>
                         <p className="text-lg font-bold text-slate-900 font-mono tracking-tighter">85 <span className="text-xs">كجم</span></p>
                      </div>
                      <div className="p-4 bg-slate-50/50 rounded-2xl text-center border border-slate-50">
                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">طاقة متجددة</p>
                         <p className="text-lg font-bold text-slate-900 font-mono tracking-tighter">120 <span className="text-xs">ك.واط</span></p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Weather & Distribution Section */}
              <div className="space-y-6">
                {/* Distribution Chart */}
                <div className="editorial-card p-8">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">توزيع المحصول</h3>
                  <div className="h-[250px] w-full mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={DISTRIBUTION_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {DISTRIBUTION_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              borderRadius: '16px', 
                              border: 'none', 
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {DISTRIBUTION_DATA.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium text-slate-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-mono">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="editorial-card p-8 border-l-4 border-emerald-600">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400">الطقس في المزرعة</span>
                        <span className="text-xl font-bold text-slate-900">صحو، 28°م</span>
                      </div>
                      <CloudSun className="h-10 w-10 text-amber-500 opacity-80" />
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex items-center gap-3">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-semibold text-slate-700">نسبة الرطوبة</span>
                         </div>
                         <span className="font-bold text-slate-900">65%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex items-center gap-3">
                            <Sprout className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm font-semibold text-slate-700">صحة المحصول</span>
                         </div>
                         <span className="font-bold text-emerald-600">ممتازة</span>
                      </div>
                   </div>
                </div>

                <div className="bg-emerald-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                   <div className="relative z-10">
                     <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold italic">فرصة مميزة</span>
                     <h3 className="text-2xl font-bold mt-2">مشروع تمور السكري</h3>
                     <p className="text-sm text-emerald-100/80 mt-4 leading-relaxed font-medium">
                       عائد متوقع 18% سنوياً مع ضمانات بنكية وإشراف تقني متكامل.
                     </p>
                     <Button className="mt-6 w-full bg-white text-emerald-900 font-bold hover:bg-emerald-50 rounded-xl transition-all">
                        اكتشف المزيد
                     </Button>
                   </div>
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-800 rounded-full opacity-30" />
                </div>
              </div>
            </div>

            {/* Activity Timeline Section */}
            <section className="mt-12 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">الجدول الزمني للنشاط الميداني</h2>
                  <span className="text-xs text-emerald-600 font-bold cursor-pointer hover:underline">عرض كل النشاطات</span>
               </div>
               
               <div className="space-y-10 relative before:absolute before:right-[23px] before:top-4 before:bottom-4 before:w-px before:bg-slate-200">
                  {MOCK_TIMELINE.map((activity, i) => (
                    <motion.div 
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="relative pr-16"
                    >
                      {/* Timeline Icon Node */}
                      <div className="absolute right-0 top-0 w-12 h-12 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-sm bg-slate-50 text-xl font-bold">
                        {activity.icon}
                      </div>

                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                             <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">{activity.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">{activity.plot}</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {activity.time}
                                  </span>
                                </div>
                             </div>
                             <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                                <div className="text-start">
                                  <span className="text-[10px] font-bold text-slate-400 block uppercase">المشغل</span>
                                  <span className="text-sm font-bold text-slate-700">{activity.operator}</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-200" />
                             </div>
                          </div>
                          <p className="text-slate-600 leading-relaxed italic mb-6 text-sm">
                            {activity.notes}
                          </p>
                          
                          {activity.image && (
                            <div className="flex gap-4 mb-6">
                              <div className="w-40 h-28 rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-transform hover:scale-105">
                                <img src={activity.image} alt="Activity" className="w-full h-full object-cover" />
                              </div>
                              <div className="w-40 h-28 rounded-2xl overflow-hidden border border-slate-100 shadow-sm opacity-60">
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                                  صورة 2
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-4">
                             <Button variant="ghost" size="sm" className="text-xs font-bold gap-2 text-slate-500 hover:text-emerald-600">
                                <ImageIcon className="h-4 w-4" />
                                صور إضافية
                             </Button>
                             <Button variant="ghost" size="sm" className="text-xs font-bold gap-2 text-emerald-600 hover:bg-emerald-50 rounded-xl px-4">
                                توثيق Blockchain
                                <ShieldCheck className="h-4 w-4" />
                              </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </section>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Operator Dashboard: Simple and Action-Oriented */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-start">
              <div className="border-2 border-dashed border-emerald-600/20 rounded-[2.5rem] bg-emerald-50/50 p-12 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-emerald-50 transition-all">
                 <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6 shadow-xl shadow-emerald-200/50 group-hover:scale-110 transition-all">
                    <Plus className="h-10 w-10 text-white" />
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">إضافة نشاط ميداني</h2>
                 <p className="text-slate-500 max-w-sm font-semibold italic">
                   وثق عمليات الري، التسميد، والحصاد فوراً وشاركها مع المستثمرين.
                 </p>
              </div>

              <div className="editorial-card p-10 flex flex-col justify-between">
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">المهام العاجلة</h2>
                    <div className="space-y-4">
                       {[
                         { task: "فحص تسرب مياه قطعة A-10", priority: "high" },
                         { task: "تعبئة خزان السماد رقم 2", priority: "medium" },
                         { task: "تجهيز معدات جني المحصول", priority: "low" },
                       ].map((task, i) => (
                         <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
                           {task.priority === 'high' ? <AlertCircle className="h-5 w-5 text-red-500" /> : <Clock className="h-5 w-5 text-slate-400" />}
                           <span className="font-bold text-slate-700 flex-1">{task.task}</span>
                           <Button size="sm" variant="outline" className="rounded-xl px-4 font-bold border-slate-200">ابدأ</Button>
                         </div>
                       ))}
                    </div>
                 </div>
                 <Button className="editorial-button editorial-button-primary mt-10">عرض كافة المهام</Button>
              </div>
            </div>

            <section className="text-start">
               <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">آخر النشاطات المسجلة</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {MOCK_TIMELINE.slice(0, 3).map((item) => (
                   <div key={item.id} className="editorial-card overflow-hidden group">
                      <div className="h-44 overflow-hidden">
                         <img src={item.image} alt="Act" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <div className="p-6">
                         <div className="flex items-center justify-between mb-2">
                           <h4 className="font-bold text-slate-900">{item.title}</h4>
                           <span className="text-[10px] text-slate-400 font-bold">{item.time}</span>
                         </div>
                         <p className="text-xs text-slate-500 line-clamp-2 italic font-medium">{item.notes}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
