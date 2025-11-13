import Search from '../components/search';
import { CrearFactura } from '../components/botones';
import TablaFacturas from '../components/tabla-facturas';

export default function FacturasPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Facturas</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar facturas..." />
        <CrearFactura />
      </div>
      <TablaFacturas />
    </div>
  );
}