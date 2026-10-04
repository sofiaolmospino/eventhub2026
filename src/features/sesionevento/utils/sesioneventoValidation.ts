import type { SesionEventoFormData } from '../types/SesionEventoFormData';

export type SesionEventoFormErrors = Partial<
    Record<keyof SesionEventoFormData, string>
>;

export function validarSesionEvento(
    data: SesionEventoFormData
): SesionEventoFormErrors {
    const errors: SesionEventoFormErrors = {};

    if (!data.eventoId) {
        errors.eventoId = 'Debe seleccionar un evento.';
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
        new Date(data.fechaFin) <= new Date(data.fechaInicio)
    ) {
        errors.fechaFin =
            'La fecha de fin debe ser posterior a la fecha de inicio.';
    }

    return errors;
}