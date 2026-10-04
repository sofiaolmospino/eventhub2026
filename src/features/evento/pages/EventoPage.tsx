import { useEffect, useState } from 'react';
import EventoForm from '../components/EventoForm';
import EventoTable from '../components/EventoTable';
import { eventoService } from '../services/eventoService';
import type { Evento } from '../models/Evento';

export default function EventoPage() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const cargarEventos = async () => {
            try {
                setLoading(true);
                setError('');

                const data = await eventoService.listar(
                    controller.signal
                );

                setEventos(data);
            } catch (err) {
                if (
                    err instanceof DOMException &&
                    err.name === 'AbortError'
                ) {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Error inesperado'
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        void cargarEventos();

        return () => controller.abort();
    }, []);

    return (
        <section className="feature-page">

            <div className="page-heading">
                <div>
                    <p className="eyebrow">
                        GESTION DE EVENTOS
                    </p>

                    <h1>Eventos</h1>
                </div>

                <button
                    type="button"
                    className="btn-primary"
                    onClick={() =>
                        setMostrarFormulario((prev) => !prev)
                    }
                >
                    {mostrarFormulario
                        ? 'Cerrar formulario'
                        : '+ Nuevo evento'}
                </button>
            </div>

            {mostrarFormulario && (
                <EventoForm
                    onCreated={(nuevoEvento) => {
                        setEventos((prev) => [
                            ...prev,
                            nuevoEvento,
                        ]);
                    }}
                />
            )}

            {loading && (
                <div className="state-card">
                    Cargando eventos...
                </div>
            )}

            {error && (
                <div className="state-card error">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <EventoTable eventos={eventos} />
            )}

        </section>
    );
}