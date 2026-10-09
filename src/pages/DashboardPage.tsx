import { useEventos } from '../features/evento/hooks/useEventos';
import { useSesionesEvento } from '../features/sesionevento/hooks/useSesionesEvento';

export default function DashboardPage() {
    const eventos = useEventos();
    const sesiones = useSesionesEvento();

    const loading = eventos.loading || sesiones.loading;
    const error = eventos.error || sesiones.error;

    const capacidadTotal = eventos.data.reduce(
        (total, evento) => total + (evento.capacidad || 0),
        0,
    );

    const modalidades = new Set(
        eventos.data
            .map((evento) => evento.modalidad.trim())
            .filter((modalidad) => modalidad !== ''),
    ).size;

    if (loading) {
        return (
            <section className="feature-page">
                <p role="status">Cargando dashboard...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="feature-page">
                <div className="state-card error" role="alert">
                    No se pudo cargar el dashboard: {error}
                </div>
            </section>
        );
    }

    return (
        <section className="feature-page">
            <div className="page-heading">
                <div>
                    <p className="eyebrow">PANEL PRINCIPAL</p>
                    <h2>Bienvenido a EventHub</h2>
                    <p>Resumen general de tus eventos y sesiones.</p>
                </div>
            </div>

            <div className="stats-grid">
                <article className="stat-card">
                    <span>Eventos registrados</span>
                    <strong>{eventos.data.length}</strong>
                </article>

                <article className="stat-card">
                    <span>Sesiones programadas</span>
                    <strong>{sesiones.data.length}</strong>
                </article>

                <article className="stat-card">
                    <span>Capacidad total registrada</span>
                    <strong>{capacidadTotal}</strong>
                </article>

                <article className="stat-card">
                    <span>Modalidades disponibles</span>
                    <strong>{modalidades}</strong>
                </article>
            </div>

            {eventos.data.length === 0 && sesiones.data.length === 0 && (
                <div className="empty-state">
                    <h3>Aún no hay información registrada</h3>
                    <p>
                        Cuando registres eventos y sesiones, sus datos
                        aparecerán en este panel.
                    </p>
                </div>
            )}
        </section>
    );
}