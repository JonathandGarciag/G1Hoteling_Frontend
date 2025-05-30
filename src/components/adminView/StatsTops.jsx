import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function StatsTop() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:3000/hoteling/vht/statistics/top-hoteles")
    .then((res) => res.json())
    .then((data) => {
      const labels = data.map((item) => item.nombre);
      const values = data.map((item) => item.totalReservas);

      setChartData({
        labels,
        datasets: [
          {
            label: "Hoteles más reservados",
            data: values,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            borderWidth: 1,
          },
        ],
      });
    })
    .catch((error) => {
      console.error("Error al cargar los datos de estadística:", error);
    })
    .finally(() => setLoading(false));
}, []);


return (
  <div className="p-5 w-auto max-w-3xl mx-auto">
    <h2 className="text-xl font-bold mb-4 text-center">
      Estadística de Hoteles más Reservados
    </h2>
    {loading ? (
      <p className="text-center">Cargando gráfico...</p>
    ) : (
      chartData && (
        <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
          <PolarArea
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                animateRotate: true,
                duration: 1500,
              },
            }}
          />
        </div>
      )
    )}
  </div>
);

}
