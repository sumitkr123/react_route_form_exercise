import { useEffect, useState } from "react";
import "./css/post.css";

import logo from "../../logo.svg";
import { Link, useLocation } from "react-router-dom";
import { PostCard } from "./components/post_card";

export const Posts = () => {
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(5);

  const loadmore = () => {
    setCount((prevvalue) => prevvalue + 1);
  };

  const propsdata = location.state;

  useEffect(() => {
    console.log('Use effect called..');

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${propsdata}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let newposts = data;
        for (let i in newposts) {
          newposts[i].show = false;
        }
        setPosts(newposts);
      });
  },[propsdata]);

  console.log('Post index called')

  if (posts.length === 0) {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="posts">
        {posts.slice(0, count).map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <div className="navlinks">
        <Link to={`/`}>Go to Home</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/users`}>Go to User-page</Link>
      </div>
      {count < 10 ? <button onClick={loadmore}>Load More</button> : <div></div>}
    </div>
  );
};
