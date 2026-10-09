import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardPage from './DashboardPage';

vi.mock('../features/evento/hooks/useEventos', () => ({
    useEventos: () => ({
        data: [
            {
                eventoId: 1,
                nombre: 'Conferencia de prueba',
                descripcion: 'Evento de prueba',
                responsable: 'Sofía',
                modalidad: 'Presencial',
                fechaInicio: '2026-10-10',
                fechaFin: '2026-10-10',
                capacidad: 50,
                estado: 'Activo',
                usuarioId: 1,
                createdAt: '',
                updatedAt: '',
            },
        ],
        loading: false,
        error: '',
    }),
}));

vi.mock('../features/sesionevento/hooks/useSesionesEvento', () => ({
    useSesionesEvento: () => ({
        data: [
            {
                sesionEventoId: 1,
                eventoId: 1,
                sede: 'Sede central',
                sala: 'Sala A',
                fechaInicio: '2026-10-10',
                fechaFin: '2026-10-10',
                createdAt: '',
                updatedAt: '',
            },
        ],
        loading: false,
        error: '',
    }),
}));

describe('DashboardPage', () => {
    it('muestra las métricas de eventos y sesiones', () => {
        render(<DashboardPage />);

        expect(
            screen.getByRole('heading', {
                name: 'Bienvenido a EventHub',
            }),
        ).toBeInTheDocument();

        expect(screen.getByText('Eventos registrados')).toBeInTheDocument();
        expect(screen.getByText('Sesiones programadas')).toBeInTheDocument();

        expect(screen.getByText('50')).toBeInTheDocument();
    });
});