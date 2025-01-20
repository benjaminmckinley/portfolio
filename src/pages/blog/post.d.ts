export type Post = {
  title: string;
  pubDate: Date;
  description: string;
  shortDescription: string;
  author: string;
  image: PostImage;
  tags: string[];
};

type PostImage = {
  url: string;
  alt: string;
};
