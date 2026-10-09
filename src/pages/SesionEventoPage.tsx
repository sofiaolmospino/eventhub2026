import { useEffect, useMemo, useState } from 'react';
import SesionEventoTable from '../features/sesionevento/components/SesionEventoTable.tsx';
import SesionEventoForm from '../features/sesionevento/components/SesionEventoForm.tsx';
import { sesionEventoService } from '../features/sesionevento/services/sesioneventoService.ts';
import type { SesionEvento } from '../features/sesionevento/types/SesionEvento.ts';
import { useSesionesEvento } from '../features/sesionevento/hooks/useSesionesEvento.ts';
import { useEventos } from '../features/evento/hooks/useEventos.ts';
import { Pagination } from '../components/ui/Pagination';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';

export default function SesionEventoPage() {
    const {
        data: sesionesEvento,
        setData: setSesionesEvento,
        loading,
        error,
        setError,
    } = useSesionesEvento();

    const {
        data: eventos,
        loading: loadingEventos,
        error: errorEventos,
    } = useEventos();

    const [sesionEnEdicion, setSesionEnEdicion] =
        useState<SesionEvento | null>(null);
    const [eventoFiltro, setEventoFiltro] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [pendingDelete, setPendingDelete] = useState<SesionEvento | null>(null);
    const [mensaje, setMensaje] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    const handleSaved = (
        sesionGuardada: SesionEvento,
        mode: 'create' | 'edit',
    ) => {
        setSesionesEvento((prev) =>
            mode === 'create'
                ? [...prev, sesionGuardada]
                : prev.map((sesion) =>
                    sesion.sesionEventoId === sesionGuardada.sesionEventoId
                        ? sesionGuardada
                        : sesion,
                ),
        );

        setSesionEnEdicion(null);
        setError('');
        setMensaje(
            mode === 'create'
                ? 'Sesión creada correctamente.'
                : 'Sesión actualizada correctamente.',
        );
    };

    const handleDelete = (sesion: SesionEvento) => {
        setPendingDelete(sesion);
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;

        try {
            setDeletingId(pendingDelete.sesionEventoId);
            setError('');
            setMensaje('');

            await sesionEventoService.eliminar(pendingDelete.sesionEventoId);

            setSesionesEvento((prev) =>
                prev.filter(
                    (item) =>
                        item.sesionEventoId !== pendingDelete.sesionEventoId,
                ),
            );

            if (
                sesionEnEdicion?.sesionEventoId === pendingDelete.sesionEventoId
            ) {
                setSesionEnEdicion(null);
            }

            setPendingDelete(null);
            setMensaje('Sesión eliminada correctamente.');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'No se pudo eliminar la sesión.',
            );
        } finally {
            setDeletingId(null);
        }
    };

    const sesionesFiltradas = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();

        return sesionesEvento.filter((sesion) => {
            const coincideEvento =
                eventoFiltro === '' ||
                sesion.eventoId === Number(eventoFiltro);

            const evento = eventos.find(
                (item) => item.eventoId === sesion.eventoId,
            );

            const coincideTexto =
                !texto ||
                [
                    sesion.sesionEventoId,
                    sesion.sede,
                    sesion.sala,
                    evento?.nombre,
                ].some((valor) =>
                    String(valor ?? '').toLowerCase().includes(texto),
                );

            return coincideEvento && coincideTexto;
        });
    }, [sesionesEvento, eventos, eventoFiltro, busqueda]);

    const totalPages = Math.max(
        1,
        Math.ceil(sesionesFiltradas.length / pageSize),
    );

    const paginaActual = Math.min(Math.max(1, page), totalPages);
    const start = (paginaActual - 1) * pageSize;

    const sesionesVisibles = sesionesFiltradas.slice(
        start,
        start + pageSize,
    );

    useEffect(() => {
        setPage(1);
    }, [busqueda, eventoFiltro, pageSize]);

    const ahora = new Date();

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

            <SesionEventoForm
                sesion={sesionEnEdicion}
                onSaved={handleSaved}
                onCancelEdit={() => setSesionEnEdicion(null)}
            />

            {mensaje && (
                <div className="state-card">{mensaje}</div>
            )}

            {(error || errorEventos) && (
                <div className="state-card error">
                    {error || errorEventos}
                </div>
            )}

            <div className="stats-grid">
                <article className="stat-card">
                    <span>Total</span>
                    <strong>{sesionesEvento.length}</strong>
                </article>

                <article className="stat-card">
                    <span>Próximas</span>
                    <strong>
                        {
                            sesionesEvento.filter(
                                (sesion) =>
                                    new Date(sesion.fechaInicio) > ahora,
                            ).length
                        }
                    </strong>
                </article>

                <article className="stat-card">
                    <span>Finalizadas</span>
                    <strong>
                        {
                            sesionesEvento.filter(
                                (sesion) =>
                                    new Date(sesion.fechaFin) < ahora,
                            ).length
                        }
                    </strong>
                </article>
            </div>

            <div className="form-filter">
                <label htmlFor="eventoFiltro">
                    Filtrar sesiones por evento
                </label>

                <select
                    id="eventoFiltro"
                    value={eventoFiltro}
                    onChange={(e) => setEventoFiltro(e.target.value)}
                >
                    <option value="">
                        {loadingEventos
                            ? 'Cargando eventos...'
                            : 'Todos los eventos'}
                    </option>

                    {eventos.map((evento) => (
                        <option
                            key={evento.eventoId}
                            value={String(evento.eventoId)}
                        >
                            {evento.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-filter">
                <label htmlFor="buscarSesion">Buscar sesiones </label>
                <input
                    id="buscarSesion"
                    type="search"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Sede, sala, evento"
                />
            </div>

            {loading ? (
                <div className="state-card">
                    Cargando sesiones de evento...
                </div>
            ) : (
                <>
                    <SesionEventoTable
                        sesiones={sesionesVisibles}
                        eventos={eventos}
                        onEdit={(sesion) => {
                            setMensaje('');
                            setError('');
                            setSesionEnEdicion(sesion);
                        }}
                        onDelete={handleDelete}
                        deletingId={deletingId}
                    />

                    <Pagination
                        page={paginaActual}
                        totalPages={totalPages}
                        onPageChange={(nextPage) =>
                            setPage(
                                Math.min(
                                    Math.max(1, nextPage),
                                    totalPages,
                                ),
                            )
                        }
                    />
                </>
            )}

            <ConfirmDialog
                open={pendingDelete !== null}
                title="Eliminar sesión"
                message={
                    pendingDelete
                        ? `¿Seguro que deseas eliminar la sesión ${pendingDelete.sesionEventoId}?`
                        : ''
                }
                confirming={deletingId !== null}
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </section>
    );
}