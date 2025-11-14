'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GraficoTendenciaProps {
  facturas: any[];
}

export default function GraficoTendencia({ facturas }: GraficoTendenciaProps) {

  const datosTendencia = [
    { mes: 'Ene', crecimiento: 5, facturas: 8 },
    { mes: 'Feb', crecimiento: 12, facturas: 12 },
    { mes: 'Mar', crecimiento: 8, facturas: 15 },
    { mes: 'Abr', crecimiento: 15, facturas: 18 },
    { mes: 'May', crecimiento: 20, facturas: 22 },
    { mes: 'Jun', crecimiento: 25, facturas: facturas.length },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={datosTendencia} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="facturas" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Total Facturas"
          />
          <Line 
            type="monotone" 
            dataKey="crecimiento" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Crecimiento %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}