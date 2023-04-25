import "../css/comments.css";

export const CommentCard = (props) => {
  const comment = props.comment;

  return (
    <div key={comment.id} className="commentcard">
      <div className="commentcontent defpadding">
        <div className="flexrow">
          <div className="flexrow">
            <label>Name :- </label>
            <p className="defpadding">{comment.name}</p>
          </div>
          <div className="flexrow">
            <label>Email :- </label>
            <p className="defpadding">{comment.email}</p>
          </div>
        </div>
        <div className="flexcolumn">
          <label>Comment :- </label>
          <p>{comment.body}</p>
        </div>
      </div>
    </div>
  );
};
