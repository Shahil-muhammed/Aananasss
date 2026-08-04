import Hero from "@/components/story/Hero";
import { StorySection } from "@/components/story/StorySection";
import Values from "@/components/story/Values";

import { getStoryData } from "@/lib/story/story";

interface OurStoryPageProps {
  params: Promise<{
    locale: "en" | "ar";
  }>;
}

export default async function OurStoryPage({
  params,
}: OurStoryPageProps) {
  await params;

  const story = await getStoryData();

  return (
    <>
      <Hero hero={story.hero} />

      {story.sections.map((section) => (
        <StorySection
          key={section.id}
          section={section}
        />
      ))}

      <Values values={story.values} />
    </>
  );
}