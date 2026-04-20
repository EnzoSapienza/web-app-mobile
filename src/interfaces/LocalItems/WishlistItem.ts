export default interface WishlistItem {
  id: number;
  priority: number; // Campo requerido: Prioridad/Estrellas
  label: string; // Campo requerido: Categoría/Etiqueta
  note?: string; // Campo opcional: Nota personal (máx 150 carac.)
}
