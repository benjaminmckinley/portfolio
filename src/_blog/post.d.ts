export type Article = {
  title: string;
  pubDate: Date;
  description: string;
  author: string;
  image: ArticleImage;
  tags: string[];
};

type ArticleImage = {
  url: string;
  alt: string;
};
