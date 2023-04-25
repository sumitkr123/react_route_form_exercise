import "../css/post.css";
import { useState } from "react";
import { CommentCard } from "./comment_card";

export const PostCard = (props) => {
  const [post, setPost] = useState(props.post);

  const comments = (postid) => {
    if (!Object.keys(post).includes("comments")) {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let postnew = post;

          if (postnew.id === postid) {
            postnew.comments = data;
            postnew.show = !postnew.show;
          } else {
            postnew.show = false;
          }

          setPost({ ...postnew });
        });
    } else {
      let postnew = post;

      if (postnew.id === postid) {
        postnew.show = !postnew.show;
      } else {
        postnew.show = false;
      }

      setPost({ ...postnew });
    }
  };

  return (
    <div key={post.id} className="postcard">
      <div className="postcontent defpadding">
        <div className="flexcolumn">
          <div className="flexcolumn defpadding">
            <label>Id :- </label>
            <p className="defpadding">{post.id}</p>
          </div>
          <div className="flexcolumn defpadding">
            <label>Title :- </label>
            <p className="defpadding">{post.title}</p>
          </div>
          <div className="flexcolumn defpadding">
            <label>Body :- </label>
            <p className="defpadding">{post.body}</p>
          </div>
          <button className="defpadding" onClick={() => comments(post.id)}>
            View comments
          </button>
          {post.show === true &&
          post.show !== undefined &&
          post.comments.length !== 0 ? (
            post.comments.map((comment) => (
              <CommentCard comment={comment} key={comment.id} />
            ))
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
};
