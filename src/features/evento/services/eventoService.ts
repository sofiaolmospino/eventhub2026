import { apiFetch } from '../../../api/apiClient';
import type { Evento } from '../models/Evento';
import type {
    EventoCreateRequest,
    EventoUpdateRequest,
} from '../types/EventoRequests';

export const eventoService = {
    listar(signal?: AbortSignal): Promise<Evento[]> {
        return apiFetch<Evento[]>('/evento', { signal });
    },

    obtenerPorId(id: number, signal?: AbortSignal): Promise<Evento> {
        return apiFetch<Evento>(`/evento/${id}`, { signal });
    },

    crear(data: EventoCreateRequest): Promise<Evento> {
        return apiFetch<Evento>('/evento', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    actualizar(id: number, data: EventoUpdateRequest): Promise<Evento> {
        return apiFetch<Evento>(`/evento/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    buscarPorId(id: number): Promise<Evento> {
        return apiFetch<Evento>(`/evento/${id}`);
    },

    eliminar(id: number): Promise<void> {
        return apiFetch<void>(`/evento/${id}`, {
            method: 'DELETE',
        });
    },
};
