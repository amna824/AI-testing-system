// import FAQ from "./faq";
import DocsPreview from "./docs-preview";
import Features from "./features";
import Hero from "./hero";
import HowItWorks from "./how-it-works";
const HomeView = () => {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks/>
      <DocsPreview/>
    </main>
  );
};

export default HomeView;
