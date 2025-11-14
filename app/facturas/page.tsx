'use client';

import { useState, useEffect } from 'react';
import { fetchFacturas, eliminarFactura } from '../lib/api';
import { CrearFactura } from '../components/botones';
import Search from '../components/search';
import AccionesTabla from '../components/acciones-tabla';
import FormularioEditarFactura from '../components/formulario-editar-factura';

interface Factura {
  id: number;
  numeroFactura: string;
  totalFactura: number;
  clienteId?: number;
  proveedor?: {
    id: number;
    nombre: string;
    correo: string;
  };
}

export default function FacturasPage() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [facturasFiltradas, setFacturasFiltradas] = useState<Factura[]>([]);
  const [cargando, setCargando] = useState(true);
  const [facturaEditando, setFacturaEditando] = useState<Factura | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const cargarFacturas = async () => {
    try {
      setCargando(true);
      const datos = await fetchFacturas();
      setFacturas(datos);
      setFacturasFiltradas(datos);
    } catch (error) {
      console.error('Error cargando facturas:', error);
      alert('Error cargando facturas');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarFacturas();
  }, []);

  useEffect(() => {
    const filtradas = facturas.filter(factura =>
      factura.numeroFactura?.toLowerCase().includes(busqueda.toLowerCase()) ||
      factura.proveedor?.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      factura.totalFactura.toString().includes(busqueda)
    );
    setFacturasFiltradas(filtradas);
  }, [busqueda, facturas]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarFactura(id);
      await cargarFacturas();
      alert('✅ Factura eliminada exitosamente');
    } catch (error) {
      alert('❌ Error eliminando factura');
    }
  };

  const handleEditar = (id: number) => {
    const factura = facturas.find(f => f.id === id);
    if (factura) setFacturaEditando(factura);
  };

  const handleVer = (id: number) => {
    const factura = facturas.find(f => f.id === id);
    if (factura) {
      alert(`🧾 Factura #${factura.id}\nNúmero: ${factura.numeroFactura}\nTotal: $${factura.totalFactura}\nProveedor: ${factura.proveedor?.nombre}`);
    }
  };

  const handleGuardarEdicion = () => {
    setFacturaEditando(null);
    cargarFacturas();
  };

  if (cargando) {
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Facturas</h1>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Cargando facturas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Facturas</h1>
      </div>
      
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search 
          placeholder="Buscar facturas..." 
          onSearch={setBusqueda}
        />
        <CrearFactura onSuccess={cargarFacturas} />
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {facturasFiltradas.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  {busqueda ? 'No se encontraron facturas' : 'No hay facturas registradas'}
                </p>
              </div>
            ) : (
              <table className="min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th className="px-4 py-5 font-medium sm:pl-6">ID</th>
                    <th className="px-3 py-5 font-medium">Número</th>
                    <th className="px-3 py-5 font-medium">Proveedor</th>
                    <th className="px-3 py-5 font-medium">Total</th>
                    <th className="px-3 py-5 font-medium text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {facturasFiltradas.map((factura) => (
                    <tr key={factura.id} className="w-full border-b py-3 text-sm">
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">{factura.id}</td>
                      <td className="whitespace-nowrap px-3 py-3">{factura.numeroFactura || 'N/A'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{factura.proveedor?.nombre || 'N/A'}</td>
                      <td className="whitespace-nowrap px-3 py-3">${factura.totalFactura || 0}</td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <AccionesTabla
                          id={factura.id}
                          tipo="factura"
                          onEditar={handleEditar}
                          onEliminar={handleEliminar}
                          onVer={handleVer}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {facturaEditando && (
        <FormularioEditarFactura
          factura={facturaEditando}
          onClose={() => setFacturaEditando(null)}
          onSuccess={handleGuardarEdicion}
        />
      )}
    </div>
  );
}