export interface TocItem {
  id: string;
  title: string;
  depth: number;
}

export interface PostData {
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags: string[];
  toc?: TocItem[];
  body?: React.ReactNode;
}

export interface Page<T = PostData> {
  url: string;
  data: T;
}
