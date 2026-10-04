import type { Evento } from '../models/Evento';

interface EventoTableProps {
    eventos: Evento[];
}

export default function EventoTable({ eventos }: EventoTableProps) {
    if (eventos.length === 0) {
        return <div className="empty-state">No hay eventos registrados.</div>;
    }

    return (
        <div className="table-card">
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Evento</th>
                        <th>Descripción</th>
                        <th>Responsable</th>
                        <th>Modalidad</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Capacidad</th>
                        <th>Usuario ID</th>
                    </tr>
                    </thead>

                    <tbody>
                    {eventos.map((evento) => (
                        <tr key={evento.eventoId}>
                            <td>{evento.eventoId}</td>
                            <td>{evento.nombre}</td>
                            <td>{evento.descripcion}</td>
                            <td>{evento.responsable}</td>
                            <td>{evento.modalidad}</td>
                            <td>{evento.fechaInicio}</td>
                            <td>{evento.fechaFin}</td>
                            <td>{evento.capacidad}</td>
                            <td>{evento.usuarioId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}