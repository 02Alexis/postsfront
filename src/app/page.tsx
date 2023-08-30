import PostCart from "@/components/PostCart";

async function loaderPost() {  
  // ejecuta una petición
  const res = await fetch("http://localhost:8000/posts/");
  // convierte los datos en json
  const data = await res.json();
  // console.log(data);

  // retorna los datos
  return data;
}

async function HomePage() {
  const posts = await loaderPost();
  return (
    <main className="py-6 px-4 mx-auto" style={{ maxWidth: 840 }}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-7">
          {posts.map((post) => (
            <PostCart post={post} key={post.id} />
          ))}

          <div className="border bg-white rounded-xl mb-4"></div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
