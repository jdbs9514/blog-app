import { connectToDB } from "@/utils/database";
import Post from "@/app/models/post";

export const GET = async (request) => {
  try {
    await connectToDB();
    const posts = await Post.find({}).populate("creator");
    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch all Posts', {
      status: 200,
    });
  }
};
