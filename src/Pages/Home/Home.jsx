import Hero from "../../Components/landing/Hero";
import TemplateSelector from "../../Components/landing/TemplateSelector";
import ToolsHub from "../../Components/landing/ToolsHub";
import FrequentlyAskedQuestion from "../../Components/landing/FAQ";
import Pricing from "../../Components/landing/Pricing";
import Footer from "../../Components/shared/footer/Footer";
import HandyFreeTools from "../../Components/landing/HandyFreeTools";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <TemplateSelector />
        <ToolsHub />
        <HandyFreeTools />

        <FrequentlyAskedQuestion />

        <Pricing />
        <Footer />
      </main>
    </>
  );
};

export default Home;
