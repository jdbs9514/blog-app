import { connectToDB } from "@/utils/database";
import Post from "@/app/models/post";

// GET to read
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate("creator");
    if(!post) return new Response("Post not found", { status: 404 });
    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch all Posts', {
      status: 200,
    });
  }
};

// PATCH to update
export const PATCH = async (request, { params }) => {
  const { post, tag } = await request.json();

  try{
    await connectToDB();
    const existingPost = await Post.findById(params.id);

    if(!existingPost) return new Response("Post not found", { status: 404 });

    existingPost.post = post;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), { status: 200 })

  } catch (error) {
    return new Response("Failed to update post", { status: 500 })
  }
};

// DELETE to remove
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(params.id);
    return new Response("Post deleted successfully", { status: 200 })
  } catch (error) {
    return new Response("Failed to delete post", { status: 500 })
  }
};
