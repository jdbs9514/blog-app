"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import copy from "@/app/assets/copy.png";
import tick from "@/app/assets/tick.png";

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");

  // con esta funcion podemas copiar el texto del post para pegar en cualquier lugar
  const handleCopy = () => {
    setCopied(post.post);
    navigator.clipboard.writeText(post.post);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="post_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user profile picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-white">
              {post.creator.username}
            </h3>
            <p className="text-white text-sm">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.post ? tick : copy}
            alt="copy link"
            width={16}
            height={12}
          />
        </div>
      </div>
      <p className="text-white my-4 text-sm">{post.post}</p>
      <p 
        className="text-white text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PostCard;
