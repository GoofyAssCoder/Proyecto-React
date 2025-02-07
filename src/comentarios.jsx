import { useState, useEffect } from "react";

const Comentarios = ({ postId }) => {
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true); // Nuevo estado para manejar la carga

    useEffect(() => {
        if (!postId) {
            console.warn("postId no está definido.");
            return;
        }

        async function fetchComentarios() {
            try {
                console.log(`Obteniendo comentarios para postId: ${postId}`);
                
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                
                if (!response.ok) {
                    throw new Error(`Error en la API: ${response.status}`);
                }

                const data = await response.json();
                console.log("Comentarios recibidos:", data);
                
                setComentarios(data);
            } catch (error) {
                console.error("Error al obtener los comentarios:", error);
            } finally {
                setCargando(false); // Finaliza la carga
            }
        }

        fetchComentarios();
    }, [postId]); // Ejecuta el efecto solo si cambia el postId

    return (
        <details>
            <summary>Comentarios</summary>
            <div className="comment-list">
                {cargando ? (
                    <p>Cargando comentarios...</p>
                ) : comentarios.length > 0 ? (
                    comentarios.map(comentario => (
                        <div className="comment" key={comentario.id}>
                            <h2>Autor: {comentario.name}</h2>
                            <p><strong>Email:</strong> {comentario.email}</p>
                            <p>{comentario.body}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios disponibles.</p>
                )}
            </div>
        </details>
    );
};

export default Comentarios;