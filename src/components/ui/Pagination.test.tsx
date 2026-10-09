import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
    it('solicita la página siguiente al pulsar Siguiente', async () => {
        const user = userEvent.setup();
        const onPageChange = vi.fn();

        render(
            <Pagination
                page={1}
                totalPages={3}
                onPageChange={onPageChange}
            />,
        );

        await user.click(
            screen.getByRole('button', { name: /siguiente/i }),
        );

        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('deshabilita Anterior cuando está en la primera página', () => {
        render(
            <Pagination
                page={1}
                totalPages={3}
                onPageChange={vi.fn()}
            />,
        );

        expect(
            screen.getByRole('button', { name: /anterior/i }),
        ).toBeDisabled();
    });
});