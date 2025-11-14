'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Factura {
  id: number;
  numeroFactura: string;
  totalFactura: number;
  proveedor?: {
    nombre: string;
  };
}

interface GraficoFacturasProps {
  facturas: Factura[];
}

export default function GraficoFacturas({ facturas }: GraficoFacturasProps) {

  const datosGrafico = [
    { mes: 'Ene', facturas: Math.floor(Math.random() * 10) + 1, total: Math.floor(Math.random() * 10000) + 1000 },
    { mes: 'Feb', facturas: Math.floor(Math.random() * 10) + 1, total: Math.floor(Math.random() * 10000) + 1000 },
    { mes: 'Mar', facturas: Math.floor(Math.random() * 10) + 1, total: Math.floor(Math.random() * 10000) + 1000 },
    { mes: 'Abr', facturas: Math.floor(Math.random() * 10) + 1, total: Math.floor(Math.random() * 10000) + 1000 },
    { mes: 'May', facturas: Math.floor(Math.random() * 10) + 1, total: Math.floor(Math.random() * 10000) + 1000 },
    { mes: 'Jun', facturas: facturas.length, total: facturas.reduce((sum, f) => sum + (f.totalFactura || 0), 0) },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datosGrafico} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'total') return [`$${value.toLocaleString()}`, 'Total Facturado'];
              return [value, 'N° Facturas'];
            }}
          />
          <Bar dataKey="facturas" fill="#8884d8" name="Facturas" />
          <Bar dataKey="total" fill="#82ca9d" name="Total Facturado" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}