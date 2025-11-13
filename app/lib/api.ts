const COMPONENTE_A_URL = 'http://localhost:8080';
const COMPONENTE_B_URL = 'http://localhost:8081';


export async function fetchClientes() {
  try {
    const res = await fetch(`${COMPONENTE_A_URL}/clientes`, {
      cache: 'no-store', 
    });
    
    if (!res.ok) {
      throw new Error('Error fetching clientes');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching clientes:', error);
    return [];
  }
}

export async function fetchPedidos() {
  try {
    const res = await fetch(`${COMPONENTE_A_URL}/pedidos`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Error fetching pedidos');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    return [];
  }
}


export async function fetchProveedores() {
  try {
    const res = await fetch(`${COMPONENTE_B_URL}/proveedores`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Error fetching proveedores');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching proveedores:', error);
    return [];
  }
}

export async function fetchFacturas() {
  try {
    const res = await fetch(`${COMPONENTE_B_URL}/facturas`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Error fetching facturas');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching facturas:', error);
    return [];
  }
}