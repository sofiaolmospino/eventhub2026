import { apiFetch } from '../../../api/apiClient';
import type { Evento } from '../models/Evento';
import type { EventoCreateRequest } from '../types/EventoCreateRequest';

export const eventoService = {
    listar(signal?: AbortSignal): Promise<Evento[]> {
        return apiFetch<Evento[]>('/evento', { signal });
    },

    crear(data: EventoCreateRequest): Promise<Evento> {
        return apiFetch<Evento>('/evento', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};