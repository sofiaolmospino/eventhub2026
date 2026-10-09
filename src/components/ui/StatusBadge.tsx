export function StatusBadge({ active }: { active: boolean }) {
    return <span className={`badge ${active ? 'badge--active' : 'badge--inactive'}`}>
    {active ? 'Activo' : 'Inactivo'}
  </span>;
}
