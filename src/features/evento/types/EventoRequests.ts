import type { Evento } from '../models/Evento';

export type EventoCreateRequest = Omit<
    Evento,
    'eventoId' | 'createdAt' | 'updatedAt'
>;

export type EventoUpdateRequest = Omit<
    Evento,
    'eventoId' | 'createdAt' | 'updatedAt'
>;
