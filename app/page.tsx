import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function Home() {
  const latestNewsItem = await prisma.newsItem.findFirst({
    where: {
      date: {
        not: null,
      },
      status: "APPROVED",
    },
    orderBy: {
      date: "desc",
    },
  });

  if (!latestNewsItem || !latestNewsItem.date) {
    return (
      <div className="text-2xl font-bold mb-6 px-6 pt-6">
        <h1 className="text-2xl font-bold mb-6 px-6 pt-6">
          Latest Ethereum News
        </h1>
        <p>No news found</p>
      </div>
    );
  }

  // Calculate year, month, and week from the latest news item
  const date = new Date(latestNewsItem.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const week = Math.ceil(dayOfMonth / 7);

  redirect(`/news/${year}/${month}/${week}`);
}
