import { eventoService } from '../services/eventoService';
import { useAsyncList } from '../../../hooks/useAsyncList';
import type { Evento } from '../models/Evento';

export function useEventos() {
    return useAsyncList<Evento>(eventoService.listar);
}