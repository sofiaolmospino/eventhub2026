import type { SesionEvento } from '../types/SesionEvento';
import type { Evento } from '../../evento/models/Evento';

interface SesionEventoTableProps {
    sesiones: SesionEvento[];
    eventos: Evento[];
    onEdit: (sesion: SesionEvento) => void;
    onDelete: (sesion: SesionEvento) => void;
    deletingId: number | null;
}

const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-BO', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
};

export default function SesionEventoTable({
                                              sesiones,
                                              eventos,
                                              onEdit,
                                              onDelete,
                                              deletingId,
                                          }: SesionEventoTableProps) {
    const eventoPorId = new Map(
        eventos.map((evento) => [evento.eventoId, evento])
    );

    if (sesiones.length === 0) {
        return (
            <div className="empty-state">
                No hay sesiones de eventos registradas.
            </div>
        );
    }

    return (
        <div className="table-card">
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Evento</th>
                        <th>Sede</th>
                        <th>Sala</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>

                    <tbody>
                    {sesiones.map((sesion) => {
                        const evento = eventoPorId.get(sesion.eventoId);
                        const eliminando =
                            deletingId === sesion.sesionEventoId;

                        return (
                            <tr key={sesion.sesionEventoId}>
                                <td>{sesion.sesionEventoId}</td>

                                <td>
                                    {evento
                                        ? evento.nombre
                                        : `Evento #${sesion.eventoId}`}
                                </td>

                                <td>{sesion.sede}</td>
                                <td>{sesion.sala}</td>
                                <td>{formatearFecha(sesion.fechaInicio)}</td>
                                <td>{formatearFecha(sesion.fechaFin)}</td>
                                <td>{formatearFecha(sesion.createdAt)}</td>
                                <td>{formatearFecha(sesion.updatedAt)}</td>

                                <td>
                                    <div className="form-actions">
                                        <button
                                            type="button"
                                            className="btn-secondary"
                                            onClick={() => onEdit(sesion)}
                                            disabled={deletingId !== null}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="btn-primary"
                                            onClick={() => onDelete(sesion)}
                                            disabled={deletingId !== null}
                                        >
                                            {eliminando
                                                ? 'Eliminando...'
                                                : 'Eliminar'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}