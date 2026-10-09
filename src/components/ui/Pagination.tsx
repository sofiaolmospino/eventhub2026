import {Button} from "./Button.tsx";


type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    return (
        <nav className="pagination" aria-label="Paginacion">
            <Button variant="ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                Anterior
            </Button>
            <span>Pagina {page} de {totalPages}</span>
            <Button variant="ghost" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
                Siguiente
            </Button>
        </nav>
    );
}
