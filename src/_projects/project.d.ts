export type Project = {
  title: string;
  date: ProjectDate;
  description: string;
  author: string;
  image: ProjectImage;
  url: string;
  tags: string[];
};

type ProjectImage = {
  url: string;
  alt: string;
};

type ProjectDate =
  | Date
  | {
      startDate: Date;
      endDate: Date;
    };
