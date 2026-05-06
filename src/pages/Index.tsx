import Hero from "@/components/aardvark/Hero";
import Story from "@/components/aardvark/Story";
import Flavors from "@/components/aardvark/Flavors";
import Values from "@/components/aardvark/Values";
import Visit from "@/components/aardvark/Visit";
import ShareButton from "@/components/aardvark/ShareButton";
import FullMenu from "@/components/aardvark/FullMenu";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="sr-only">Aardvark Cafe — Where Metro Meets Peaceful · Thoothukudi</h1>
      <Hero />
      <Story />
      <Flavors />
      <Values />
      <Visit />
      <ShareButton />
      <FullMenu />
    </main>
  );
};

export default Index;

