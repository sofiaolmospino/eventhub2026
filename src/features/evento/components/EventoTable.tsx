import type { Evento } from '../models/Evento';

interface EventoTableProps {
    eventos: Evento[];
    onEdit: (id: number) => void;
    onDelete: (evento: Evento) => void;
    deletingId?: number | null;
}

export default function EventoTable({
                                        eventos,
                                        onEdit,
                                        onDelete,
                                        deletingId,
                                    }: EventoTableProps) {
    if (eventos.length === 0) {
        return (
            <div className="empty-state">
                No hay eventos registrados.
            </div>
        );
    }

    return (
        <div className="table-card">
            <div className="table-responsive">
                <table className="data-table evento-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Evento</th>
                        <th>Responsable</th>
                        <th>Modalidad</th>
                        <th>Capacidad</th>
                        <th>Fecha inicio</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>

                    <tbody>
                    {eventos.map((evento) => {
                        const eliminando =
                            deletingId === evento.eventoId;

                        return (
                            <tr key={evento.eventoId}>
                                <td>{evento.eventoId}</td>

                                <td>
                                    <div className="evento-name">
                                        {evento.nombre}
                                    </div>
                                    <div className="evento-description">
                                        {evento.descripcion}
                                    </div>
                                </td>

                                <td>{evento.responsable}</td>

                                <td>
                                        <span className="evento-modalidad">
                                            {evento.modalidad}
                                        </span>
                                </td>

                                <td>{evento.capacidad}</td>

                                <td>
                                    {new Date(
                                        evento.fechaInicio,
                                    ).toLocaleString('es-BO')}
                                </td>

                                <td>
                                    <div className="form-actions">
                                        <button
                                            type="button"
                                            className="btn-secondary"
                                            onClick={() =>
                                                onEdit(evento.eventoId)
                                            }
                                            disabled={deletingId != null}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="btn-primary"
                                            onClick={() =>
                                                onDelete(evento)
                                            }
                                            disabled={deletingId != null}
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