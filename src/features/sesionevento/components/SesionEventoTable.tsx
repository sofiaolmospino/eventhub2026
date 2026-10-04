import type { SesionEvento } from '../types/SesionEvento';

interface SesionEventoTableProps {
    sesiones: SesionEvento[];
}

const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-BO', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
};

export default function SesionEventoTable({
                                              sesiones,
                                          }: SesionEventoTableProps) {
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
                        <th>Evento ID</th>
                        <th>Sede</th>
                        <th>Sala</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                    </tr>
                    </thead>

                    <tbody>
                    {sesiones.map((sesion) => (
                        <tr key={sesion.sesionEventoId}>
                            <td>{sesion.sesionEventoId}</td>
                            <td>{sesion.eventoId}</td>
                            <td>{sesion.sede}</td>
                            <td>{sesion.sala}</td>
                            <td>
                                {formatearFecha(sesion.fechaInicio)}
                            </td>
                            <td>
                                {formatearFecha(sesion.fechaFin)}
                            </td>
                            <td>
                                {formatearFecha(sesion.createdAt)}
                            </td>
                            <td>
                                {formatearFecha(sesion.updatedAt)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}