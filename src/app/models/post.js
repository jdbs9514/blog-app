import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  post: {
    type: String,
    required: [true, "Please add a post"],
  },
  
  tag: {
    type: String,
    required: [true, "Please add a tag"],
  }
});

const Post = models.Post || model("Post", PostSchema);
export default Post;