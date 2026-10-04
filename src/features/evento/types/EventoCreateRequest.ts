export interface EventoCreateRequest {
    nombre: string;
    descripcion: string;
    responsable: string;
    modalidad: string;
    fechaInicio: string;
    fechaFin: string;
    capacidad: number;
    estado: string;
    usuarioId: number;
}