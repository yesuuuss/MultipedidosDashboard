'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface GraficoDistribucionProps {
  totalClientes: number;
  totalProveedores: number;
  totalFacturas: number;
  totalPedidos: number;
}

export default function GraficoDistribucion({ 
  totalClientes, 
  totalProveedores, 
  totalFacturas, 
  totalPedidos 
}: GraficoDistribucionProps) {
  const datosDistribucion = [
    { name: 'Clientes', value: totalClientes, color: '#10b981' },
    { name: 'Proveedores', value: totalProveedores, color: '#8b5cf6' },
    { name: 'Facturas', value: totalFacturas, color: '#3b82f6' },
    { name: 'Pedidos', value: totalPedidos, color: '#f59e0b' },
  ].filter(item => item.value > 0); 

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={datosDistribucion}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {datosDistribucion.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}