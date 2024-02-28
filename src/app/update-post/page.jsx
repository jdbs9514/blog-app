"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    post: "",
    tag: "",
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      setPost({
        post: data.post,
        tag: data.tag,
      });
    }
    if(postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!postId) return alert('Post ID not found')

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          post: post.post,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default EditPost;
