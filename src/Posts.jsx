import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comentarios from "./Comentarios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const postList = await res.json();
      setPosts(postList);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const userList = await res.json();
      setUsers(userList);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="post-list">
      {loading ? <p>Cargando posts...</p> :
        posts.map(post => (
          <div className="post" key={post.id}>
            <h1>{post.title}</h1>
            <h2>
              Autor: <Link to={`/perfil/${post.userId}`}>{users.find(user => user.id === post.userId)?.name}</Link>
            </h2>
            <p>{post.body}</p>
            <Comentarios postId={post.id} />
          </div>
        ))
      }
    </div>
  );
}

export default Posts;