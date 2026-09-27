import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
}

type TrendChartsProps = {
  incomeData: DataItem[];
  expenseData: DataItem[];
  categoryData: DataItem[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Colores para el gráfico de categorías

const TrendCharts: React.FC<TrendChartsProps> = ({
  incomeData,
  expenseData,
  categoryData,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        height: "400px",
      }}
    >
      <ResponsiveContainer width="50%" height="100%">
        <BarChart data={incomeData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#009688" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="50%" height="100%">
        <BarChart data={expenseData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#D32F2F" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="50%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendCharts;
