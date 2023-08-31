export interface Post {
  _id: string;
  userImage: string;
  userName: string;
  title: string;
  image_url: string;
  description: string;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  userName: string;
  userImage: string;
  createdAt: string;
  text: string;
}
