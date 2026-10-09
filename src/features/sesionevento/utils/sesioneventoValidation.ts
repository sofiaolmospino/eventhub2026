import type { SesionEventoFormData } from '../types/SesionEventoFormData';

export type SesionEventoFormErrors = Partial<
    Record<keyof SesionEventoFormData, string>
>;

export function validarSesionEvento(
    data: SesionEventoFormData
): SesionEventoFormErrors {
    const errors: SesionEventoFormErrors = {};

    const eventoId = Number(data.eventoId);

    if (
        !data.eventoId.trim() ||
        !Number.isInteger(eventoId) ||
        eventoId <= 0
    ) {
        errors.eventoId = 'Debe seleccionar un evento válido.';
    }

    if (!data.sede.trim()) {
        errors.sede = 'La sede es obligatoria.';
    }

    if (!data.sala.trim()) {
        errors.sala = 'La sala es obligatoria.';
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
        !Number.isNaN(new Date(data.fechaInicio).getTime()) &&
        !Number.isNaN(new Date(data.fechaFin).getTime()) &&
        new Date(data.fechaFin) <= new Date(data.fechaInicio)
    ) {
        errors.fechaFin =
            'La fecha de fin debe ser posterior a la fecha de inicio.';
    }

    return errors;
}