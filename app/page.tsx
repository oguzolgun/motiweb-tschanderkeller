import Header from "@/components/Header";
import HeroScrollSequence from "@/components/HeroScrollSequence";
import PageSections from "@/components/PageSections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroScrollSequence />
        <PageSections />
      </main>
    </>
  );
}
