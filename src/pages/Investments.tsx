import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  MapPin, 
  Clock, 
  Search,
  Filter,
  ArrowRight,
  Leaf,
  X
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { formatCurrency } from "../lib/utils";

const MOCK_OPPORTUNITIES = [
  {
    id: "1",
    title: "مزرعة العلا للحمضيات",
    cropType: "برتقال، ليمون",
    location: "العلا، المملكة العربية السعودية",
    duration: "18 شهر",
    expectedReturn: "15% - 22%",
    minInvestment: 5000,
    startDate: "2024-05-01",
    endDate: "2025-11-01",
    image: "https://images.unsplash.com/photo-1543831839-8588825f7787?auto=format&fit=crop&q=80&w=800",
    tags: ["عائد مرتفع", "طلب عالمي"]
  },
  {
    id: "2",
    title: "مشروع وادي الدواسر للقمح",
    cropType: "قمح صلب",
    location: "وادي الدواسر، المملكة العربية السعودية",
    duration: "12 شهر",
    expectedReturn: "12% - 18%",
    minInvestment: 10000,
    startDate: "2024-06-01",
    endDate: "2025-06-01",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800",
    tags: ["أمن غذائي", "دورة سريعة"]
  },
  {
    id: "3",
    title: "بيوت الجوف المحمية",
    cropType: "خضروات",
    location: "الجوف، المملكة العربية السعودية",
    duration: "24 شهر",
    expectedReturn: "10% - 14%",
    minInvestment: 3000,
    startDate: "2024-04-01",
    endDate: "2026-04-01",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    tags: ["استدامة", "تقنية حديثة"]
  }
];

export default function Investments() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredOpportunities = selectedTag 
    ? MOCK_OPPORTUNITIES.filter(item => item.tags.includes(selectedTag))
    : MOCK_OPPORTUNITIES;

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-start">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">فرص الاستثمار المتاحة</h1>
            <p className="text-slate-500 text-lg font-medium italic">
              اختر الفرصة التي تناسب تطلعاتك المالية وشارك في نهضة القطاع الزراعي المحلي والعالمي.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <Input placeholder="بحث عن فرصة..." className="pr-12 h-12 bg-white rounded-2xl border-slate-100 shadow-sm focus:bg-white" />
            </div>
            <Button variant="outline" className="h-12 rounded-2xl gap-2 font-bold px-6 border-slate-100 bg-white text-slate-600">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {selectedTag && (
          <div className="flex items-center gap-4 mb-12 animate-in fade-in slide-in-from-top-2 duration-300">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">تصفية حسب:</span>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full border-none shadow-md">
                {selectedTag}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedTag(null)}
                className="h-8 rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 gap-1 font-bold text-xs"
              >
                <X size={14} />
                مسح التصفية
              </Button>
            </div>
          </div>
        )}

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="editorial-card group h-full flex flex-col p-0 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {item.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTag(tag);
                        }}
                        className="bg-white/95 text-emerald-700 hover:bg-emerald-600 hover:text-white text-[10px] font-bold shadow-sm px-3 py-1 rounded-full border-none tracking-widest uppercase cursor-pointer transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs mb-3 uppercase tracking-widest">
                       <Leaf size={14} />
                       {item.cropType}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{item.title}</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-slate-500">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium italic">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium italic">المدة: {item.startDate} إلى {item.endDate}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">العائد المتوقع</span>
                        <span className="text-xl font-bold text-emerald-600">{item.expectedReturn}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">الحد الأدنى</span>
                        <span className="text-xl font-bold text-slate-900">{formatCurrency(item.minInvestment)}</span>
                      </div>
                    </div>
                  </div>

                  <Link to={`/investments/${item.id}`} className="block">
                    <Button className="editorial-button w-full h-14 text-md font-bold bg-slate-900 hover:bg-emerald-600 text-white transition-all">
                      عرض التفاصيل
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
