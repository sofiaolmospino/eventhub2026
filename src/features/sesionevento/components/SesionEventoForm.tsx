import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type { Evento } from '../../evento/models/Evento';
import { eventoService } from '../../evento/services/eventoService';
import type { SesionEventoCreateRequest } from '../types/SesionEventoCreateRequest';
import type { SesionEventoFormData } from '../types/SesionEventoFormData';
import type { SesionEvento } from '../types/SesionEvento';
import {
    validarSesionEvento,
    type SesionEventoFormErrors,
} from '../utils/sesioneventoValidation';
import { sesionEventoService } from '../services/sesioneventoService';

const initialSesionEventoForm: SesionEventoFormData = {
    eventoId: '',
    sede: '',
    sala: '',
    fechaInicio: '',
    fechaFin: '',
};

interface SesionEventoFormProps {
    sesion?: SesionEvento | null;
    onSaved?: (
        sesion: SesionEvento,
        mode: 'create' | 'edit'
    ) => void;
    onCancelEdit?: () => void;
}

export default function SesionEventoForm({
                                             sesion,
                                             onSaved,
                                             onCancelEdit,
                                         }: SesionEventoFormProps) {
    const [formData, setFormData] =
        useState<SesionEventoFormData>(initialSesionEventoForm);

    const [eventos, setEventos] = useState<Evento[]>([]);
    const [errors, setErrors] = useState<SesionEventoFormErrors>({});
    const [mensaje, setMensaje] = useState('');
    const [intentoGuardar, setIntentoGuardar] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [cargandoEventos, setCargandoEventos] = useState(true);

    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const data = await eventoService.listar();
                setEventos(data);
            } catch (error) {
                console.error('Error al cargar eventos:', error);
                setMensaje('No se pudieron cargar los eventos.');
            } finally {
                setCargandoEventos(false);
            }
        };

        void cargarEventos();
    }, []);

    useEffect(() => {
        if (sesion) {
            setFormData({
                eventoId: String(sesion.eventoId),
                sede: sesion.sede,
                sala: sesion.sala,
                fechaInicio: sesion.fechaInicio.slice(0, 16),
                fechaFin: sesion.fechaFin.slice(0, 16),
            });
        } else {
            setFormData({ ...initialSesionEventoForm });
        }

        setErrors({});
        setMensaje('');
        setIntentoGuardar(false);
    }, [sesion]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMensaje('');
        setIntentoGuardar(true);

        const validationErrors = validarSesionEvento(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const sesionEventoPayload: SesionEventoCreateRequest = {
            eventoId: Number(formData.eventoId),
            sede: formData.sede.trim(),
            sala: formData.sala.trim(),
            fechaInicio: new Date(formData.fechaInicio).toISOString(),
            fechaFin: new Date(formData.fechaFin).toISOString(),
        };

        try {
            setEnviando(true);

            if (sesion) {
                const actualizada = await sesionEventoService.actualizar(
                    sesion.sesionEventoId,
                    sesionEventoPayload
                );

                onSaved?.(actualizada, 'edit');
                setMensaje('Sesión de evento actualizada correctamente.');
            } else {
                const creada = await sesionEventoService.crear(
                    sesionEventoPayload
                );

                onSaved?.(creada, 'create');
                setFormData({ ...initialSesionEventoForm });
                setMensaje('Sesión de evento creada correctamente.');
            }

            setErrors({});
            setIntentoGuardar(false);
        } catch (error) {
            console.error('Error al guardar sesión de evento:', error);

            setMensaje(
                error instanceof Error
                    ? error.message
                    : 'No se pudo guardar la sesión de evento.'
            );
        } finally {
            setEnviando(false);
        }
    };

    const handleLimpiar = () => {
        if (sesion) {
            onCancelEdit?.();
        } else {
            setFormData({ ...initialSesionEventoForm });
        }

        setErrors({});
        setMensaje('');
        setIntentoGuardar(false);
    };

    return (
        <form
            className="entity-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <h2>
                {sesion ? 'Editar sesión de evento' : 'Crear sesión de evento'}
            </h2>

            <div className="form-grid">
                <label>
                    Evento

                    <select
                        name="eventoId"
                        value={formData.eventoId}
                        onChange={handleChange}
                        disabled={cargandoEventos || enviando}
                        required
                    >
                        <option value="">
                            {cargandoEventos
                                ? 'Cargando eventos...'
                                : 'Seleccione un evento'}
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

                    {errors.eventoId && (
                        <small className="field-error">
                            {errors.eventoId}
                        </small>
                    )}
                </label>

                <label>
                    Sede

                    <input
                        type="text"
                        name="sede"
                        value={formData.sede}
                        onChange={handleChange}
                        placeholder="Ej. La Paz"
                        disabled={enviando}
                        required
                    />

                    {errors.sede && (
                        <small className="field-error">
                            {errors.sede}
                        </small>
                    )}
                </label>

                <label>
                    Sala

                    <input
                        type="text"
                        name="sala"
                        value={formData.sala}
                        onChange={handleChange}
                        placeholder="Ej. Sala 1"
                        disabled={enviando}
                        required
                    />

                    {errors.sala && (
                        <small className="field-error">
                            {errors.sala}
                        </small>
                    )}
                </label>

                <label>
                    Fecha de inicio

                    <input
                        type="datetime-local"
                        name="fechaInicio"
                        value={formData.fechaInicio}
                        onChange={handleChange}
                        disabled={enviando}
                        required
                    />

                    {errors.fechaInicio && (
                        <small className="field-error">
                            {errors.fechaInicio}
                        </small>
                    )}
                </label>

                <label>
                    Fecha de fin

                    <input
                        type="datetime-local"
                        name="fechaFin"
                        value={formData.fechaFin}
                        onChange={handleChange}
                        disabled={enviando}
                        required
                    />

                    {errors.fechaFin && (
                        <small className="field-error">
                            {errors.fechaFin}
                        </small>
                    )}
                </label>
            </div>

            {mensaje && (
                <div className="state-card">
                    {mensaje}
                </div>
            )}

            {intentoGuardar && Object.keys(errors).length > 0 && (
                <div className="field-error">
                    Errores encontrados: {Object.keys(errors).length}
                </div>
            )}

            <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleLimpiar}
                    disabled={enviando}
                >
                    {sesion ? 'Cancelar edición' : 'Limpiar'}
                </button>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={enviando || cargandoEventos}
                >
                    {enviando
                        ? 'Guardando...'
                        : sesion
                            ? 'Actualizar sesión'
                            : 'Guardar sesión'}
                </button>
            </div>
        </form>
    );
}