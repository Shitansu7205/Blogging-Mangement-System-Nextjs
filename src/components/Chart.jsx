"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Jan", posts: 30, views: 500 },
  { name: "Feb", posts: 45, views: 700 },
  { name: "Mar", posts: 50, views: 900 },
  { name: "Apr", posts: 40, views: 850 },
  { name: "May", posts: 60, views: 1100 },
];

const pieData = [
  { name: "Tech", value: 45 },
  { name: "Lifestyle", value: 25 },
  { name: "Education", value: 30 },
];

const COLORS = ["#6366F1", "#22C55E", "#FACC15"];

export default function Chart() {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-white/10 to-white/30 backdrop-blur-lg shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        📊 Analytics Overview
      </h2>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 transition-transform transform hover:scale-[1.02]">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📈 Monthly Blog Posts & Views</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#4F46E5" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 transition-transform transform hover:scale-[1.02]">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📉 Monthly Views Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="col-span-1 md:col-span-2 bg-white shadow-lg rounded-xl p-4 sm:p-5 transition-transform transform hover:scale-[1.02]">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📌 Blog Categories Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      
    </div>
  );
}
