export interface Post {
  titulo: string;           // Título del post
  descripcion: string;      // Descripción del post
  usuario_id: number;       // ID del usuario que creó el post
  post_id: number;          // ID único del post
  fecha?: string;            // Fecha del post en formato YYYY-MM-DD
  comentarios?: Comentario[]; // Lista de comentarios asociados
}

export interface Comentario {
  usuario_id: number;   
  usuario_nombre?: string    // ID del usuario que hizo el comentario
  contenido: string;        // Contenido del comentario
  fecha?: string;            // Fecha del comentario
}
