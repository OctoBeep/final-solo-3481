export interface Order {
    _id?: string; // El ID es opcional al registrar una nueva orden
    platos: { 
      nombre: string; 
      cantidad: number; 
    }[];
    estado: 'pendiente' | 'entregado' | 'cancelado';
  }
  