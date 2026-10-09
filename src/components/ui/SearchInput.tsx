type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = 'Buscar...' }: SearchInputProps) {
    return (
        <label className="field">
            <span className="field__label">Busqueda</span>
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </label>
    );
}
