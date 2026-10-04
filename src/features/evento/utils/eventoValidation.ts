import type { EventoFormData } from '../types/EventoFormData';

export type EventoFormErrors = Partial<Record<keyof EventoFormData, string>>;

export function validarEvento(data: EventoFormData): EventoFormErrors {
    const errors: EventoFormErrors = {};

    if (!data.nombre.trim()) {
        errors.nombre = 'El nombre es obligatorio.';
    }

    if (!data.descripcion.trim()) {
        errors.descripcion = 'La descripción es obligatoria.';
    }

    if (!data.responsable.trim()) {
        errors.responsable = 'El responsable es obligatorio.';
    }

    if (!data.modalidad.trim()) {
        errors.modalidad = 'La modalidad es obligatoria.';
    }

    if (!data.fechaInicio) {
        errors.fechaInicio = 'La fecha de inicio es obligatoria.';
    }

    if (!data.fechaFin) {
        errors.fechaFin = 'La fecha de fin es obligatoria.';
    }

    if (
        data.fechaInicio &&
        data.fechaFin &&
        new Date(data.fechaFin) <= new Date(data.fechaInicio)
    ) {
        errors.fechaFin =
            'La fecha de fin debe ser posterior a la fecha de inicio.';
    }

    if (!data.capacidad || data.capacidad <= 0) {
        errors.capacidad = 'La capacidad debe ser mayor a 0.';
    }

    if (!data.usuarioId || data.usuarioId <= 0) {
        errors.usuarioId = 'El usuario es obligatorio.';
    }

    return errors;
}