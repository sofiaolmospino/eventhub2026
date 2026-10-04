import { apiFetch } from '../../../api/apiClient';
import type { SesionEvento } from '../types/SesionEvento';
import type { SesionEventoCreateRequest } from '../types/SesionEventoCreateRequest';

export const sesionEventoService = {
    listar(signal?: AbortSignal): Promise<SesionEvento[]> {
        return apiFetch<SesionEvento[]>('/sesion-evento', {
            signal,
        });
    },

    buscarPorId(id: number): Promise<SesionEvento> {
        return apiFetch<SesionEvento>(`/sesion-evento/${id}`);
    },

    crear(data: SesionEventoCreateRequest): Promise<SesionEvento> {
        return apiFetch<SesionEvento>('/sesion-evento', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    actualizar(
        id: number,
        data: SesionEventoCreateRequest
    ): Promise<SesionEvento> {
        return apiFetch<SesionEvento>(`/sesion-evento/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    eliminar(id: number): Promise<void> {
        return apiFetch<void>(`/sesion-evento/${id}`, {
            method: 'DELETE',
        });
    },
};