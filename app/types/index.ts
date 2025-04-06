export interface NewsItem {
  id: string;
  title: string;
  description: string;
  externalLink: string;
  date: string;
  week: number;
  month: number;
  year: number;
}

export interface NewsGroup {
  year: number;
  months: {
    month: number;
    weeks: {
      week: number;
      items: NewsItem[];
    }[];
  }[];
}