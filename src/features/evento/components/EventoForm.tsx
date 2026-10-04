import {
    useState,
    type ChangeEvent,
    type FormEvent,
} from 'react';

import type { Evento } from '../models/Evento';
import type { EventoFormData } from '../types/EventoFormData';
import { eventoService } from '../services/eventoService';

import {
    validarEvento,
    type EventoFormErrors,
} from '../utils/eventoValidation';

const initialEventoForm: EventoFormData = {
    nombre: '',
    descripcion: '',
    responsable: '',
    modalidad: '',
    fechaInicio: '',
    fechaFin: '',
    capacidad: 0,
    usuarioId: 0,
};

interface EventoFormProps {
    onCreated?: (evento: Evento) => void;
}

export default function EventoForm({
                                       onCreated,
                                   }: EventoFormProps) {
    const [formData, setFormData] =
        useState<EventoFormData>(initialEventoForm);

    const [errors, setErrors] =
        useState<EventoFormErrors>({});

    const [mensaje, setMensaje] = useState('');

    const [submitting, setSubmitting] =
        useState(false);

    const [apiError, setApiError] =
        useState('');

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'capacidad' ||
                name === 'usuarioId'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setMensaje('');
        setApiError('');

        const validationErrors =
            validarEvento(formData);

        setErrors(validationErrors);

        if (
            Object.keys(validationErrors).length > 0
        ) {
            return;
        }

        const eventoPayload = {
            ...formData,

            nombre: formData.nombre.trim(),
            descripcion: formData.descripcion.trim(),
            responsable: formData.responsable.trim(),
            modalidad: formData.modalidad.trim(),

            fechaInicio: new Date(formData.fechaInicio).toISOString(),
            fechaFin: new Date(formData.fechaFin).toISOString(),

            capacidad: Number(formData.capacidad),
            usuarioId: Number(formData.usuarioId),

            estado: 'BORRADOR',
        };

        try {
            setSubmitting(true);

            const creado =
                await eventoService.crear(
                    eventoPayload
                );

            onCreated?.(creado);

            setFormData(initialEventoForm);
            setErrors({});

            setMensaje(
                'Evento creado correctamente.'
            );
        } catch (err) {
            setApiError(
                err instanceof Error
                    ? err.message
                    : 'No se pudo crear el evento'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleLimpiar = () => {
        setFormData(initialEventoForm);
        setErrors({});
        setMensaje('');
        setApiError('');
    };

    return (
        <form
            className="entity-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="form-grid">

                <label>
                    Nombre

                    <input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />

                    {errors.nombre && (
                        <small className="field-error">
                            {errors.nombre}
                        </small>
                    )}
                </label>

                <label>
                    Responsable

                    <input
                        name="responsable"
                        value={formData.responsable}
                        onChange={handleChange}
                    />

                    {errors.responsable && (
                        <small className="field-error">
                            {errors.responsable}
                        </small>
                    )}
                </label>

                <label className="form-span-2">
                    Descripción

                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows={4}
                    />

                    {errors.descripcion && (
                        <small className="field-error">
                            {errors.descripcion}
                        </small>
                    )}
                </label>

                <label>
                    Modalidad

                    <select
                        name="modalidad"
                        value={formData.modalidad}
                        onChange={handleChange}
                    >
                        <option value="">
                            Seleccione una modalidad
                        </option>

                        <option value="PRESENCIAL">
                            Presencial
                        </option>

                        <option value="VIRTUAL">
                            Virtual
                        </option>

                        <option value="HIBRIDO">
                            Híbrido
                        </option>
                    </select>

                    {errors.modalidad && (
                        <small className="field-error">
                            {errors.modalidad}
                        </small>
                    )}
                </label>

                <label>
                    Capacidad

                    <input
                        type="number"
                        name="capacidad"
                        min="1"
                        value={
                            formData.capacidad || ''
                        }
                        onChange={handleChange}
                    />

                    {errors.capacidad && (
                        <small className="field-error">
                            {errors.capacidad}
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
                    />

                    {errors.fechaFin && (
                        <small className="field-error">
                            {errors.fechaFin}
                        </small>
                    )}
                </label>

                <label className="form-span-2">
                    Usuario ID

                    <input
                        type="number"
                        name="usuarioId"
                        min="1"
                        value={
                            formData.usuarioId || ''
                        }
                        onChange={handleChange}
                    />

                    {errors.usuarioId && (
                        <small className="field-error">
                            {errors.usuarioId}
                        </small>
                    )}
                </label>

            </div>

            {mensaje && (
                <div className="form-success">
                    {mensaje}
                </div>
            )}

            {apiError && (
                <div className="form-error">
                    {apiError}
                </div>
            )}

            <div className="form-actions">

                <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleLimpiar}
                    disabled={submitting}
                >
                    Limpiar
                </button>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={submitting}
                >
                    {submitting
                        ? 'Guardando...'
                        : 'Guardar evento'}
                </button>

            </div>
        </form>
    );
}