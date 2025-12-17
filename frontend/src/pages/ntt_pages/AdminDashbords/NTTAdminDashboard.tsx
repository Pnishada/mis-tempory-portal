import React, { useState, useMemo } from "react";
import {
  Users,
  Award,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  BarChart3,
  PieChart,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const NTTAdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState("month");

  /* ================= MOCK DATA ================= */
  const students = [
    { trade: "Electrician", slccl: "pass", status: "active", center: "Colombo" },
    { trade: "Beautician", slccl: "fail", status: "active", center: "Kandy" },
    { trade: "Carpenter", slccl: "referred", status: "inactive", center: "Galle" },
    { trade: "ICT Technician", slccl: "pass", status: "completed", center: "Matara" },
    { trade: "Electrician", slccl: "pass", status: "active", center: "Colombo" },
  ];

  /* ================= AGGREGATIONS ================= */
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const passed = students.filter((s) => s.slccl === "pass").length;
    const passRate = ((passed / totalStudents) * 100).toFixed(1);

    const tradeCounts: Record<string, number> = {};
    const tradePass: Record<string, number> = {};

    students.forEach((s) => {
      tradeCounts[s.trade] = (tradeCounts[s.trade] || 0) + 1;
      if (s.slccl === "pass") {
        tradePass[s.trade] = (tradePass[s.trade] || 0) + 1;
      }
    });

    const tradeDist = Object.entries(tradeCounts).map(([trade, count], i) => ({
      trade,
      count,
      percent: Math.round((count / totalStudents) * 100),
      color: ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"][i % 4],
    }));

    const topTrades = Object.keys(tradeCounts).map((trade) => {
      const total = tradeCounts[trade];
      const passed = tradePass[trade] || 0;
      const rate = Math.round((passed / total) * 100);
      return {
        trade,
        rate,
        trend: rate >= 80 ? "up" : rate >= 50 ? "stable" : "down",
      };
    });

    return {
      totalStudents,
      passRate,
      avgGrade: "2.4",
      activeCenters: new Set(students.map((s) => s.center)).size,
      completed: students.filter((s) => s.status === "completed").length,
      pending: students.filter((s) => s.status === "active").length,
      tradeDist,
      topTrades,
    };
  }, []);

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-8 bg-gray-50">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NTT Admin Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            National Trade Test Administration Portal
          </p>
        </div>

        <select
          className="border rounded-lg px-4 py-2 bg-white text-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* ================= KPI ROW ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: stats.totalStudents, icon: Users },
          { label: "Pass Rate", value: `${stats.passRate}%`, icon: Award },
          { label: "Avg Grade", value: stats.avgGrade, icon: Star },
          { label: "Active Centers", value: stats.activeCenters, icon: Clock },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-5 shadow-sm min-h-[140px] flex flex-col justify-between"
          >
            <kpi.icon className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
              <p className="text-sm text-gray-600">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ANALYTICS ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">

          {/* TRADE DISTRIBUTION */}
          <div className="bg-white border rounded-xl p-6 shadow-sm min-h-[300px]">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Student Distribution by Trade</h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-3">
              {stats.tradeDist.map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t.trade}</span>
                    <span>{t.count} ({t.percent}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${t.color}`}
                      style={{ width: `${t.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM PERFORMANCE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm min-h-[300px]">
            <h2 className="text-lg font-semibold mb-4">System Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Data Accuracy", value: "98.2%", icon: CheckCircle },
                { label: "Processing Efficiency", value: "92.4%", icon: AlertCircle },
                { label: "System Uptime", value: "99.8%", icon: CheckCircle },
                { label: "User Satisfaction", value: "4.7/5", icon: CheckCircle },
              ].map((m, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-gray-600">{m.label}</p>
                    <m.icon className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-xl font-bold">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">

          {/* RECENT ACTIVITY */}
          <div className="bg-white border rounded-xl p-6 shadow-sm min-h-[260px]">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            {students.slice(0, 4).map((_, i) => (
              <div key={i} className="flex items-center text-sm mb-3">
                <Eye className="w-4 h-4 text-blue-500 mr-2" />
                New student activity recorded
              </div>
            ))}
          </div>

          {/* TOP TRADES */}
          <div className="bg-white border rounded-xl p-6 shadow-sm min-h-[260px]">
            <h2 className="text-lg font-semibold mb-4">Top Performing Trades</h2>
            {stats.topTrades.map((t, i) => (
              <div key={i} className="flex justify-between items-center mb-2">
                <span className="text-sm">{t.trade}</span>
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-2">{t.rate}%</span>
                  {t.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PERFORMANCE ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* MONTHLY TREND */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm min-h-[300px]">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Monthly Performance Trend</h2>
              <p className="text-xs text-gray-500">Last 6 months</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-3">
            {[
              { m: "Jan", v: 78 },
              { m: "Dec", v: 76 },
              { m: "Nov", v: 75 },
              { m: "Oct", v: 73 },
              { m: "Sep", v: 72 },
              { m: "Aug", v: 70 },
            ].map((d, i) => (
              <div key={i} className="flex items-center">
                <span className="w-10 text-sm">{d.m}</span>
                <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    style={{ width: `${d.v}%` }}
                  />
                </div>
                <span className="w-12 text-right text-sm font-medium">{d.v}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border rounded-xl p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" /> Quick Stats
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Certified Students</span>
              <span className="font-medium">{stats.completed}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Students</span>
              <span className="font-medium">{stats.pending}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Trades</span>
              <span className="font-medium">{stats.tradeDist.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Centers</span>
              <span className="font-medium">{stats.activeCenters}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NTTAdminDashboard;
