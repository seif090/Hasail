import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  MapPin, 
  Clock, 
  Percent,
  ChevronLeft,
  ArrowLeft,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const MOCK_OPPORTUNITIES = [
  {
    id: "1",
    title: "مزرعة حمضيات الوادي",
    cropType: "برتقال، ليمون",
    location: "العلا، المملكة العربية السعودية",
    duration: "18 شهر",
    expectedReturn: "15% - 22%",
    minInvestment: 5000,
    image: "https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&q=80&w=800",
    tags: ["عائد مرتفع", "طلب عالمي"]
  },
  {
    id: "2",
    title: "حقول قمح نجد",
    cropType: "قمح صلب",
    location: "القصيم، المملكة العربية السعودية",
    duration: "12 شهر",
    expectedReturn: "12% - 18%",
    minInvestment: 10000,
    image: "https://images.unsplash.com/photo-1501430091776-41b4a956d721?auto=format&fit=crop&q=80&w=800",
    tags: ["أمن غذائي", "دورة سريعة"]
  },
  {
    id: "3",
    title: "بستان الزيتون المبارك",
    cropType: "زيتون عضوي",
    location: "الجوف، المملكة العربية السعودية",
    duration: "24 شهر",
    expectedReturn: "10% - 14%",
    minInvestment: 3000,
    image: "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&q=80&w=800",
    tags: ["استدامة", "منتج فاخر"]
  }
];

export default function Investments() {
  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-start">
            <h1 className="text-4xl font-black text-neutral-900 mb-4">فرص الاستثمار المتاحة</h1>
            <p className="text-neutral-500 text-lg">
              اختر الفرصة التي تناسب تطلعاتك المالية وشارك في نهضة القطاع الزراعي المحلي والعالمي.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input placeholder="بحث عن فرصة..." className="pr-10 h-11 bg-white rounded-xl border-neutral-200" />
            </div>
            <Button variant="outline" className="h-11 rounded-xl gap-2 font-bold bg-white">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_OPPORTUNITIES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 rounded-[2rem] bg-white group h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {item.tags.map(tag => (
                      <Badge key={tag} className="bg-white/90 text-primary hover:bg-white text-xs font-black shadow-sm px-3 py-1 rounded-full border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                       <LeafIcon size={16} />
                       {item.cropType}
                    </div>
                    <h3 className="text-2xl font-black text-neutral-900 mb-4">{item.title}</h3>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-neutral-500">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-neutral-500">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">مدة الاستثمار: {item.duration}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-5 bg-neutral-50 rounded-2xl mb-8 border border-neutral-100">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">العائد المتوقع</span>
                        <span className="text-lg font-black text-primary">{item.expectedReturn}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">الحد الأدنى</span>
                        <span className="text-lg font-black text-neutral-900">{item.minInvestment.toLocaleString()} ر.س</span>
                      </div>
                    </div>
                  </div>

                  <Link to={`/investments/${item.id}`} className="block">
                    <Button className="w-full h-14 text-md font-bold rounded-2xl bg-neutral-900 hover:bg-primary transition-colors duration-300">
                      عرض التفاصيل
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeafIcon({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10Z" />
      <path d="M19 10.5C16.5 9 11.5 9 8 13" />
    </svg>
  );
}
