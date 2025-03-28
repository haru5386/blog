export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  abstract: string;
  content: string;
  tags: string[];
}

export interface BlogCategory {
  name: string;
  count: number;
}
