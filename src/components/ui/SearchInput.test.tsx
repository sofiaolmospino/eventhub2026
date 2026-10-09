import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
    it('informa el texto escrito mediante onChange', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();

        render(
            <SearchInput
                value=""
                onChange={onChange}
                placeholder="Buscar eventos"
            />,
        );

        await user.type(
            screen.getByRole('searchbox'),
            'Conferencia',
        );

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenLastCalledWith('a');
    });
});