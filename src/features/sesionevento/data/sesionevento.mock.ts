import type { SesionEvento } from '../models/SesionEvento';

export const sesionesEventoMock: SesionEvento[] = [
    {
        sesionEventoId: 1,
        eventoId: 1,
        fechaInicio: '2026-10-15T09:00:00-04:00',
        fechaFin: '2026-10-15T11:00:00-04:00',
        createdAt: '2026-09-20T10:00:00-04:00',
        updatedAt: '2026-09-20T10:00:00-04:00',
    },
    {
        sesionEventoId: 2,
        eventoId: 1,
        fechaInicio: '2026-10-15T14:00:00-04:00',
        fechaFin: '2026-10-15T16:00:00-04:00',
        createdAt: '2026-09-20T10:05:00-04:00',
        updatedAt: '2026-09-20T10:05:00-04:00',
    },
    {
        sesionEventoId: 3,
        eventoId: 2,
        fechaInicio: '2026-10-20T14:00:00-04:00',
        fechaFin: '2026-10-20T15:30:00-04:00',
        createdAt: '2026-09-21T09:00:00-04:00',
        updatedAt: '2026-09-21T09:00:00-04:00',
    },
    {
        sesionEventoId: 4,
        eventoId: 3,
        fechaInicio: '2026-11-05T09:30:00-04:00',
        fechaFin: '2026-11-05T11:30:00-04:00',
        createdAt: '2026-09-22T11:00:00-04:00',
        updatedAt: '2026-09-22T11:00:00-04:00',
    },
];