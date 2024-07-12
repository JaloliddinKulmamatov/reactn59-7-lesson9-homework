import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editPost } from "../store/postSlice";
import api from "../api/api";

const PostPage = ({ handleDelete }) => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostTitle(post.title);
      setPostBody(post.body);
    }
  }, [post]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (edit) {
      const updatedPost = { ...post, title: postTitle, body: postBody };
      try {
        await api.put(`/posts/${id}`, updatedPost);
        dispatch(editPost(updatedPost));
      } catch (error) {
        console.error("Failed to edit post", error);
      }
    }
    setEdit(!edit);
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            {edit ? (
              <form onSubmit={handleEdit}>
                <input
                  type="text"
                  name="postTitle"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <textarea
                  rows={5}
                  name="postBody"
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className="postBody">{post.body}</p>
              </>
            )}
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
            <button onClick={handleEdit}>{edit ? "Cancel" : "Edit"}</button>
            <button onClick={() => navigate(-1)}>Back</button>
          </>
        ) : (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
