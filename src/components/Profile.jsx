import PostCard from "./PostCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full bg-zinc-800 h-screen">
      <h1 className="text-white text-left ml-4">
        <span className="blue_gradient text-2xl">{name} Profile</span>
      </h1>
      <p className="text-white mt-6 ml-4">{desc}</p>
      <div className="mt-16 post_layout w-[90%] ml-4">
        {data.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
