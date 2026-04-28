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
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from "@/lib/utils";

const MOCK_STATS = [
  { label: "إجمالي الاستثمارات", value: "45,000 ر.س", icon: TrendingUpIcon, trend: "+12%" },
  { label: "العائد التراكمي", value: "6,750 ر.س", icon: BarChartIcon, trend: "+8%" },
  { label: "مساحات مفعلة", value: "3.5 هكتار", icon: MapPin, trend: "0%" },
  { label: "حالة المحصول", value: "ممتازة", icon: Sprout, trend: null },
];

const MOCK_CHART_DATA = [
  { name: 'يناير', value: 4000 },
  { name: 'فبراير', value: 3000 },
  { name: 'مارس', value: 2000 },
  { name: 'ابريل', value: 2780 },
  { name: 'مايو', value: 1890 },
  { name: 'يونيو', value: 2390 },
  { name: 'يوليو', value: 3490 },
];

const MOCK_TIMELINE = [
  {
    id: "1",
    type: "irrigation",
    title: "عملية ري ذكي",
    plot: "قطعة A-12",
    time: "منذ ساعتين",
    operator: "أحمد منصور",
    status: "completed",
    notes: "تم استخدام نظام الري بالتنقيط المتصل بمجسات التربة. نسبة الرطوبة الحالية 75%.",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "2",
    type: "fertilization",
    title: "إضافة أسمدة عضوية",
    plot: "قطعة B-04",
    time: "أمس، 4:30 م",
    operator: "سليمان العتيبي",
    status: "completed",
    notes: "إضافة الدفعة الثانية من السماد المحفز للنمو الخضري.",
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "3",
    type: "planting",
    title: "زراعة شتلات جديدة",
    plot: "القطاع الشرقي",
    time: "3 أيام",
    operator: "أحمد منصور",
    status: "completed",
    notes: "تم زراعة 500 شتلة ليمون حساوي جديدة.",
    image: "https://images.unsplash.com/photo-1592398514532-690227918f69?auto=format&fit=crop&q=80&w=600"
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
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Use the profile role or fall back to 'investor' for testing
  const userRole = userProfile?.role || UserRole.INVESTOR;

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="container mx-auto px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="text-start">
             <h1 className="text-3xl font-black text-neutral-900 mb-2">أهلاً بك، {userProfile?.displayName || "مستثمر حصائل"}</h1>
             <p className="text-neutral-500 font-bold">مرحباً بك في لوحة تحكم منصة حصائل</p>
          </div>
        </div>

        {userRole === 'investor' ? (
          <div className="space-y-10 text-start">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_STATS.map((stat, i) => (
                <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                       <div className="p-3 bg-primary/5 rounded-2xl">
                          <stat.icon className="h-6 w-6 text-primary" />
                       </div>
                       {stat.trend && (
                         <Badge className="bg-emerald-50 text-emerald-600 border-none">
                            {stat.trend}
                         </Badge>
                       )}
                    </div>
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                      {stat.label}
                    </span>
                    <span className="text-2xl font-black text-neutral-900 tracking-tight">
                      {stat.value}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Chart Card */}
              <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white p-8">
                <CardHeader className="p-0 mb-8 border-none flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-black text-neutral-900">نمو عوائد المحاصيل</CardTitle>
                  <Button variant="ghost" size="sm" className="font-bold text-primary">عرض التقارير</Button>
                </CardHeader>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1E5E4C" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#1E5E4C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#A3A3A3', fontSize: 12, fontWeight: 700}}
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{fontWeight: 900, marginBottom: '5px'}}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#1E5E4C" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Weather / Plot Status */}
              <div className="space-y-6">
                <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8 border-primary/10 border-t-4">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-neutral-400">الطقس حرك المزرعة</span>
                        <span className="text-xl font-black text-neutral-900">صحو، 28°م</span>
                      </div>
                      <CloudSun className="h-10 w-10 text-accent" />
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                         <div className="flex items-center gap-3">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-bold">نسبة الرطوبة</span>
                         </div>
                         <span className="font-black">65%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                         <div className="flex items-center gap-3">
                            <Sprout className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm font-bold">صحة المحصول</span>
                         </div>
                         <span className="font-black text-emerald-600">ممتازة</span>
                      </div>
                   </div>
                </Card>

                <Card className="border-none shadow-sm rounded-[2rem] bg-neutral-900 p-8 text-white">
                   <h3 className="text-xl font-black mb-4">تحديثات المزرعة</h3>
                   <p className="text-sm text-neutral-400 mb-6 leading-relaxed font-bold">
                     مزرعة العلا حالياً في مرحلة التزهير. تم اكتمال الدورة الثالثة من الري بنجاح.
                   </p>
                   <Button className="w-full bg-white text-neutral-900 font-bold hover:bg-neutral-100 rounded-xl">
                      اطلب تقرير جرد
                   </Button>
                </Card>
              </div>
            </div>

            {/* Activity Timeline Section */}
            <section className="mt-12">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-neutral-900">الجدول الزمني للأنشطة (Live Feed)</h2>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-none font-bold">مباشر الآن</Badge>
               </div>
               
               <div className="space-y-8 relative before:absolute before:right-[23px] before:top-4 before:bottom-4 before:w-0.5 before:bg-neutral-200">
                  {MOCK_TIMELINE.map((activity, i) => (
                    <motion.div 
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="relative pr-16"
                    >
                      {/* Timeline Icon Node */}
                      <div className={cn(
                        "absolute right-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center z-10 border-4 border-white shadow-md",
                        activity.type === 'irrigation' ? "bg-blue-500" : 
                        activity.type === 'fertilization' ? "bg-emerald-500" : "bg-primary"
                      )}>
                        {activity.type === 'irrigation' ? <Droplets className="h-6 w-6 text-white" /> : 
                         activity.type === 'fertilization' ? <Sprout className="h-6 w-6 text-white" /> : <MapPin className="h-6 w-6 text-white" />}
                      </div>

                      <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white text-start">
                        <div className="flex flex-col md:flex-row">
                          {activity.image && (
                            <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                              <img src={activity.image} alt="Activity" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <CardContent className="p-8 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                               <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-black text-neutral-900">{activity.title}</h3>
                                    <Badge className="bg-neutral-100 text-neutral-500 border-none text-[10px]">{activity.plot}</Badge>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-neutral-400 font-bold">
                                    <Clock className="h-3 w-3" />
                                    {activity.time}
                                  </div>
                               </div>
                               <div className="flex items-center gap-2">
                                  <div className="text-start">
                                    <span className="text-[10px] font-bold text-neutral-400 block uppercase">المشغل</span>
                                    <span className="text-sm font-bold text-neutral-900">{activity.operator}</span>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-neutral-200" />
                               </div>
                            </div>
                            <p className="text-neutral-600 leading-relaxed italic mb-4">
                              {activity.notes}
                            </p>
                            <div className="flex items-center gap-4">
                               <Button variant="ghost" size="sm" className="text-xs font-bold gap-2">
                                  <ImageIcon className="h-3 w-3" />
                                  عرض كل الصور
                               </Button>
                               <Button variant="ghost" size="sm" className="text-xs font-bold gap-2 text-primary">
                                  بصمة الحماية (Blockchain)
                                  <ShieldCheck className="h-3 w-3" />
                                </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
               </div>
            </section>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Operator Dashboard: Simple and Action-Oriented */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-start">
              <Card className="border-dashed border-2 border-primary/20 rounded-[2.5rem] bg-primary/5 p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/10 transition-colors">
                 <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Plus className="h-10 w-10 text-white" />
                 </div>
                 <h2 className="text-3xl font-black text-neutral-900 mb-4">إضافة نشاط جديد</h2>
                 <p className="text-neutral-500 max-w-sm font-bold">
                   سجل عمليات الري، التسميد، أو الحصاد وشارك الصور مع المستثمرين بلحظة.
                 </p>
              </Card>

              <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10 flex flex-col justify-between">
                 <div>
                    <h2 className="text-2xl font-black text-neutral-900 mb-6">المهام المعلقة</h2>
                    <div className="space-y-4">
                       {[
                         { task: "فحص تسرب مياه قطعة A-10", priority: "high" },
                         { task: "تعبئة خزان السماد رقم 2", priority: "medium" },
                         { task: "تجهيز معدات جني المحصول", priority: "low" },
                       ].map((task, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                           {task.priority === 'high' ? <AlertCircle className="h-5 w-5 text-red-500" /> : <Clock className="h-5 w-5 text-neutral-400" />}
                           <span className="font-bold flex-1">{task.task}</span>
                           <Button size="sm" variant="outline" className="rounded-xl px-4">ابدأ الآن</Button>
                         </div>
                       ))}
                    </div>
                 </div>
                 <Button className="mt-8 bg-neutral-900 hover:bg-neutral-800 text-white font-bold h-12 rounded-xl">عرض كل المهام</Button>
              </Card>
            </div>

            <section className="text-start">
               <h2 className="text-2xl font-black text-neutral-900 mb-8">نشاطاتك الأخيرة</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {MOCK_TIMELINE.slice(0, 3).map((item) => (
                   <Card key={item.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                      <div className="h-40 overflow-hidden">
                         <img src={item.image} alt="Act" className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-6">
                         <div className="flex items-center justify-between mb-2">
                           <h4 className="font-black text-neutral-900">{item.title}</h4>
                           <span className="text-[10px] text-neutral-400">{item.time}</span>
                         </div>
                         <p className="text-xs text-neutral-500 line-clamp-2">{item.notes}</p>
                      </CardContent>
                   </Card>
                 ))}
               </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function BarChartIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function TrendingUpIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
