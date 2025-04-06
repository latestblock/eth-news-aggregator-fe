import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the latest news (you'll need to implement the logic to determine the latest date)
  redirect("/news/2024/4/1");
}