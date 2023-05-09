export interface FTag {
  name: string;
  color?: string;
  id?: number;
}

export interface FBlog {
  id?: number;
  title: string;
  author: string;
  gmtCreate?: string;
  content: string;
  likes?: number;
  tags?: FTag[];
  userId?: number;
}
