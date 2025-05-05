export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  date: Date;
  summary: string;
  link: string;
  // Simple string category field (maintained for backward compatibility)
  category: string;
  // Reference to the Category model
  categoryId: string | null;
  createdAt: Date;
  approvedAt: Date | null;
  publishedAt: Date | null;
  newsDigestId: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  adminMsgId: string | null;
  chatId: string | null;
  feedUrl: string;
  // Optional reference to the Category model (will be populated when included in queries)
  categoryRef?: Category;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
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

export enum Chain {
  ETHEREUM = "ETHEREUM",
  SOLANA = "SOLANA",
  BITCOIN = "BITCOIN",
}

export interface ChainOption {
  id: Chain;
  name: string;
  logo: React.ReactNode;
  disabled?: boolean;
}
