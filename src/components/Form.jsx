import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col bg-zinc-800 h-screen">
      <h1 className="head_text text-left ml-4">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="text-lg text-slate-200 sm:text-xl px-5">
        {type} a crazy theories of you favorites animes and mangas.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-semibold text-base text-white ml-5">
            Your Opinion
          </span>
          <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            placeholder="Write your theory or opinion here"
            required
            className="form_textarea"
          ></textarea>
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-base text-white ml-5">
            Tag (#Anime, #Manga, #Theory, #Opinion, #Spoiler)
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input w-[80%] ml-5 mt-2 rounded"
          />
        </label>
        <div className="flex justify-end md:mr-28 mr-16 mb-5 gap-4">
          <Link href="/" className="text-red-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 text-sm bg-sky-500 rounded-full text-white"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
