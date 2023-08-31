import PostCart from "@/components/PostCart";
import { Post } from "@/interface/types";
// import Suggestions from "@/components/Suggestions";

async function loaderPost() {  
  // ejecuta una petición
  const res = await fetch("http://localhost:8000/posts/");
  // convierte los datos en json
  const data = await res.json();
  // console.log(data);

  // retorna los datos
  return data;
}

// interface Props {
//   post: Post;
// }

async function HomePage() {
  const posts: Post[] = await loaderPost();
  return (
    <main className="py-6 px-4 mx-auto" style={{ maxWidth: 840 }}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-7">
          {posts.map((post) => (
            <PostCart post={post} key={post._id} />
          ))}

          <div className="border bg-white rounded-xl mb-4"></div>
        </div>
        <div className="col-span-5">
          {/* <Suggestions /> */}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
