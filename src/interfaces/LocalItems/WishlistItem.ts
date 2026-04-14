export default interface WishlistItem {
  id: number;
  title: string;
  artist: string;
  image: string;      // Guardamos la URL para no pedirla a la API cada vez
  priority: number;   // Campo requerido: Prioridad/Estrellas
  label: string;      // Campo requerido: Categoría/Etiqueta
  note?: string;      // Campo opcional: Nota personal (máx 150 carac.)
}