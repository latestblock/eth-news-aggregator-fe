export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  date: Date;
  summary: string;
  link: string;
  category: string;
  createdAt: Date;
  approvedAt: Date | null;
  publishedAt: Date | null;
  newsDigestId: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  adminMsgId: string | null;
  chatId: string | null;
  feedUrl: string;
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
