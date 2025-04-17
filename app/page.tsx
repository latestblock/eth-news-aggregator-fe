import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { NewsItem, NewsDigest } from "@prisma/client";
import { DigestStatus } from "@prisma/client";
import { NewsList } from "./components/news-list";

async function getApprovedDigests(): Promise<NewsDigest[]> {
  const digests = await prisma.newsDigest.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      newsItems: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  return digests;
}

export default async function Home() {
  const digests = await getApprovedDigests();

  // Redirect to the latest news (you'll need to implement the logic to determine the latest date)
  // redirect("/news/2024/4/1");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 px-6 pt-6">
        Latest Ethereum News
      </h1>
      {digests.map((digest: any) => (
        <NewsList key={digest?.id} items={digest?.newsItems} />
      ))}
    </div>
  );
}
