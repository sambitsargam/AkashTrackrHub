// import Head from "next/head";
import Hero from "../components/index/hero";
import Navbar from "../components/index/navbar";
import SectionTitle from "../components/index/sectionTitle";
import { benefitOne, benefitTwo } from "../components/index/data";
import Video from "../components/index/video";
import Benefits from "../components/index/benefits";
import Footer from "../components/index/footer";
import Testimonials from "../components/index/testimonials";
import Cta from "../components/index/cta";
import Faq from "../components/index/faq";
import PopupWidget from "../components/index/popupWidget";

export default function Home() {
  return (
    <>
      <div className="bg-gray-800">
        <Navbar />
        <Hero />
        <SectionTitle
          pretitle="AkashTrackrHub Benefits"
          title=" Why should you use AkashTrackrHub"
        ></SectionTitle>
        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
        
       

        <Cta />

        <Footer />
        <PopupWidget />
      </div>
    </>
  );
}
