import { useEffect, useMemo, useState } from 'react';
import EventoForm from '../features/evento/components/EventoForm.tsx';
import EventoTable from '../features/evento/components/EventoTable.tsx';
import { eventoService } from '../features/evento/services/eventoService.ts';
import type { Evento } from '../features/evento/models/Evento.ts';
import { useEventos } from '../features/evento/hooks/useEventos.ts';
import { Pagination } from '../components/ui/Pagination';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
export default function EventoPage() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const {
        data: eventos,
        setData: setEventos,
        loading,
        error,
        setError,
    } = useEventos();

    const [editingEvento, setEditingEvento] = useState<Evento | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Evento | null>(null);
    const [busqueda, setBusqueda] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    const handleEdit = async (id: number) => {
        try {
            setLoadingDetail(true);
            setError('');

            const evento = await eventoService.buscarPorId(id);

            setEditingEvento(evento);
            setMostrarFormulario(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'No se pudo cargar el evento'
            );
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleSaved = (saved: Evento, mode: 'create' | 'edit') => {
        setEventos((prev) => {
            if (mode === 'create') {
                return [...prev, saved];
            }

            return prev.map((evento) =>
                evento.eventoId === saved.eventoId ? saved : evento
            );
        });

        setEditingEvento(null);
    };

    const handleDelete = (evento: Evento) => {
        setPendingDelete(evento);
    };
    const confirmDelete = async () => {
        if (!pendingDelete) return;

        try {
            setDeletingId(pendingDelete.eventoId);
            setError('');

            await eventoService.eliminar(pendingDelete.eventoId);

            setEventos((prev) =>
                prev.filter(
                    (item) => item.eventoId !== pendingDelete.eventoId,
                ),
            );

            if (editingEvento?.eventoId === pendingDelete.eventoId) {
                setEditingEvento(null);
                setMostrarFormulario(false);
            }

            setPendingDelete(null);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'No se pudo eliminar el evento',
            );
        } finally {
            setDeletingId(null);
        }
    };

    const eventosFiltrados = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();

        if (!texto) {
            return eventos;
        }

        return eventos.filter((evento) =>
            [
                evento.nombre,
                evento.descripcion,
                evento.responsable,
                evento.modalidad,
                String(evento.eventoId),
            ].some((valor) =>
                String(valor ?? '').toLowerCase().includes(texto)
            )
        );
    }, [eventos, busqueda]);

    const totalPages = Math.max(
        1,
        Math.ceil(eventosFiltrados.length / pageSize)
    );

    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;

    const eventosVisibles = eventosFiltrados.slice(
        start,
        start + pageSize
    );

    useEffect(() => {
        setPage(1);
    }, [busqueda, pageSize]);

    useEffect(() => {
        if (page !== safePage) {
            setPage(safePage);
        }
    }, [page, safePage]);



    return (
        <section className="feature-page">
            <div className="page-heading">
                <div>
                    <p className="eyebrow">GESTION DE EVENTOS</p>
                    <h1>Eventos</h1>
                </div>

                <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                        setEditingEvento(null);
                        setMostrarFormulario((prev) => !prev);
                    }}
                >
                    {mostrarFormulario ? 'Cerrar formulario' : '+ Nuevo evento'}
                </button>
            </div>

            {error && (
                <div className="state-card error">
                    {error}
                </div>
            )}

            {loadingDetail && (
                <div className="state-card">
                    Cargando detalle...
                </div>
            )}

            {mostrarFormulario && (
                <EventoForm
                    evento={editingEvento}
                    onSaved={handleSaved}
                    onCancelEdit={() => {
                        setEditingEvento(null);
                        setMostrarFormulario(false);
                    }}
                />
            )}

            {loading && (
                <div className="state-card">
                    Cargando eventos...
                </div>
            )}

            <div className="form-filter">
                <label htmlFor="buscarEvento">Buscar eventos </label>
                <input
                    id="buscarEvento"
                    type="search"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Nombre, resp, modalidad"
                />
            </div>

            {!loading && (
                <>
                    <EventoTable
                        eventos={eventosVisibles}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        deletingId={deletingId}
                    />

                    <Pagination
                        page={safePage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
            <ConfirmDialog
                open={pendingDelete !== null}
                title="Eliminar evento"
                message={
                    pendingDelete
                        ? `¿Seguro que deseas eliminar el evento "${pendingDelete.nombre}"?`
                        : ''
                }
                confirming={deletingId !== null}
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </section>
    );
}