'use client'
import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 post_layout">
      {data.map((post) => (
        <PostCard 
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  })

  return(
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a post or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>
      <PostCardList 
        data={posts} 
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
