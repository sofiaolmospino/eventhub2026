import { sesionEventoService } from '../services/sesioneventoService';
import { useAsyncList } from '../../../hooks/useAsyncList';
import type { SesionEvento } from '../types/SesionEvento';

export function useSesionesEvento() {
    return useAsyncList<SesionEvento>(sesionEventoService.listar);
}