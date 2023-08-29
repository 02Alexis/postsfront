import {
  IoHeartOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoEllipsisHorizontalSharp,
  IoChatbubbleOutline,
  IoHappyOutline,
  IoHeart,
} from "react-icons/io5";

async function loadPost(id) {
  // ejecuta una petición
  const res = await fetch(`http://localhost:8000/posts/${id}`);
  // convierte los datos en json
  const data = await res.json();
  // console.log(data);

  // retorna los datos
  return data;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

async function page({ params }) {
  const post = await loadPost(params.id);

  return (
    <main className="py-6 px-4 mx-auto" style={{ maxWidth: 840 }}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-7">
          <div className="border bg-white rounded-xl mb-4">
            <div className="flex items-center justify-between p-2.5">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-neutral-200 rounded-full">
                  <img src={post.userImage} className="rounded-full" />
                </div>
                <div className="ml-2.5 text-black">
                  <p className="font-medium text-sm">{post.userName}</p>
                  <p style={{ fontSize: 12 }}>crack</p>
                </div>
              </div>
              <IoEllipsisHorizontalSharp className="text-lg mr-2 cursor-pointer" />
            </div>
            <div className="w-full bg-neutral-200">
              <img src={post.image_url} alt="" className="w-full h-full" />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between text-2xl">
                <div className="flex items-center space-x-4">
                  <IoHeart className="cursor-pointer text-red-500 transition-all active:scale-75" />
                  <IoHeartOutline className="cursor-pointer transition-all hover:opacity-50 active:scale-75" />
                  <IoChatbubbleOutline className="cursor-pointer hover:opacity-50" />
                  <IoPaperPlaneOutline className="cursor-pointer hover:opacity-50" />
                </div>
                <IoBookmarkOutline className="cursor-pointer hover:opacity-50" />
              </div>
              <div className="flex items-center my-3 space-x-2">
                <div className="flex items-center -space-x-2"></div>
              </div>
              <div className="text-sm my-2">
                <span className="font-medium inline-block mr-2">
                  {post.userName}
                </span>
                <span>{post.description}</span>
              </div>
              <p
                className="my-2 text-neutral-400 text-sm uppercase"
                style={{ fontSize: 12 }}
              >
                {formatDate(post.createdAt)}
              </p>
            </div>
            <div className="border-t p-3 text-sm flex items-center justify-between space-x-3">
              <IoHappyOutline className="text-2xl" />
              <input
                type="text"
                className="outline-none block flex-1"
                placeholder="Add a comment"
              />
              <div className="text-blue-400 font-bold mr-1 cursor-pointer">
                Post
              </div>
            </div>
          </div>

          <div className="border bg-white rounded-xl mb-4"></div>
          {post.comments.map((comment) => (
            <div key={comment._id} className=" text-white">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-neutral-200 rounded-full">
                  <img src={comment.userImage} className="rounded-full" />
                </div>
                <div className=" pl-2">
                  <p className="font-medium text-sm">{comment.userName}</p>
                  <p>{comment.text}</p>
                  <p style={{ fontSize: 12 }}>Fecha de creación: {formatDate(comment.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default page;
