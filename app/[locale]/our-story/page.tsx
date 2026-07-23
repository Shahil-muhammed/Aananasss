import Hero from "@/components/story/Hero";
import { StorySection } from "@/components/story/StorySection";
import { storySections } from "@/components/story/StorySection/storySection.data";

interface OurStoryPageProps {
  params: Promise<{
    locale: "en" | "ar";
  }>;
}

export default async function OurStoryPage({
  params,
}: OurStoryPageProps) {
  await params;

  return (
    <>
      <Hero />

      {storySections.map((section) => (
        <StorySection
          key={section.id}
          section={section}
        />
      ))}
    </>
  );
}