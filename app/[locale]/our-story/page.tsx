import Hero from "@/components/story/Hero";

interface OurStoryPageProps {
  params: Promise<{
    locale: "en" | "ar";
  }>;
}

export default async function OurStoryPage({
  params,
}: OurStoryPageProps) {
  await params;

  return <Hero />;
}