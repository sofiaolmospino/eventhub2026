import { useEffect, useState } from 'react';
import SesionEventoTable from '../components/SesionEventoTable';
import SesionEventoForm from '../components/SesionEventoForm';
import { sesionEventoService } from '../services/sesioneventoService';
import type { SesionEvento } from '../types/SesionEvento';

export default function SesionEventoPage() {
    const [sesionesEvento, setSesionesEvento] = useState<SesionEvento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarSesiones = async () => {
            try {
                setLoading(true);
                setError('');

                const data = await sesionEventoService.listar();
                setSesionesEvento(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'No se pudieron cargar las sesiones de evento'
                );
            } finally {
                setLoading(false);
            }
        };

        cargarSesiones();
    }, []);

    const total = sesionesEvento.length;

    const proximas = sesionesEvento.filter(
        (sesion) => new Date(sesion.fechaInicio) > new Date()
    ).length;

    const finalizadas = sesionesEvento.filter(
        (sesion) => new Date(sesion.fechaFin) < new Date()
    ).length;

    return (
        <section className="feature-page">
            <div className="page-heading">
                <div>
                    <p className="eyebrow">GESTIÓN DE SESIONES</p>

                    <h1>Sesiones de Evento</h1>

                    <p>
                        Sesiones asociadas a eventos mediante eventoId.
                    </p>
                </div>
            </div>

            <div className="stats-grid">
                <article className="stat-card">
                    <span>Total</span>
                    <strong>{total}</strong>
                </article>

                <article className="stat-card">
                    <span>Próximas</span>
                    <strong>{proximas}</strong>
                </article>

                <article className="stat-card">
                    <span>Finalizadas</span>
                    <strong>{finalizadas}</strong>
                </article>
            </div>

            <SesionEventoForm />

            {loading && (
                <p>Cargando sesiones de evento...</p>
            )}

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            {!loading && !error && (
                <SesionEventoTable sesiones={sesionesEvento} />
            )}
        </section>
    );
}