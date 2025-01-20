export type Project = {
  title: string;
  date: ProjectDate;
  description: string;
  shortDescription: string;
  author: string;
  image: ProjectImage;
  url?: string;
  tags: string[];
  affiliation?: string;
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
