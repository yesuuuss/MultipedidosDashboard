'use client';

import { useState, useEffect } from 'react';
import { fetchClientes, eliminarCliente } from '../lib/api';
import { CrearCliente } from '../components/botones';
import Search from '../components/search';
import AccionesTabla from '../components/acciones-tabla';
import FormularioEditarCliente from '../components/formulario-editar-cliente';

interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const datos = await fetchClientes();
      setClientes(datos);
      setClientesFiltrados(datos);
    } catch (error) {
      console.error('Error cargando clientes:', error);
      alert('Error cargando clientes');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  useEffect(() => {
    const filtrados = clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.correo.toLowerCase().includes(busqueda.toLowerCase())
    );
    setClientesFiltrados(filtrados);
  }, [busqueda, clientes]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarCliente(id);
      await cargarClientes();
      alert('Cliente eliminado exitosamente');
    } catch (error) {
      alert('Error eliminando cliente');
    }
  };

  const handleEditar = (id: number) => {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) setClienteEditando(cliente);
  };

  const handleVer = (id: number) => {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
      alert(`👤 Cliente #${cliente.id}\nNombre: ${cliente.nombre}\nEmail: ${cliente.correo}`);
    }
  };

  const handleGuardarEdicion = () => {
    setClienteEditando(null);
    cargarClientes();
  };

  if (cargando) {
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Clientes</h1>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
      </div>
      
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search 
          placeholder="Buscar clientes..." 
          onSearch={setBusqueda}
        />
        <CrearCliente onSuccess={cargarClientes} />
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {clientesFiltrados.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  {busqueda ? 'No se encontraron clientes' : 'No hay clientes registrados'}
                </p>
              </div>
            ) : (
              <table className="min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th className="px-4 py-5 font-medium sm:pl-6">ID</th>
                    <th className="px-3 py-5 font-medium">Nombre</th>
                    <th className="px-3 py-5 font-medium">Email</th>
                    <th className="px-3 py-5 font-medium text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id} className="w-full border-b py-3 text-sm">
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">{cliente.id}</td>
                      <td className="whitespace-nowrap px-3 py-3">{cliente.nombre}</td>
                      <td className="whitespace-nowrap px-3 py-3">{cliente.correo}</td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <AccionesTabla
                          id={cliente.id}
                          tipo="cliente"
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

      {clienteEditando && (
        <FormularioEditarCliente
          cliente={clienteEditando}
          onClose={() => setClienteEditando(null)}
          onSuccess={handleGuardarEdicion}
        />
      )}
    </div>
  );
}