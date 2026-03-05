import { readFileSync } from "fs";
import path from "path";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Location from "@/components/Location";
import Amenities from "@/components/Amenities";
import FloorPlan from "@/components/FloorPlan";
import SiteMap from "@/components/SiteMap";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const dynamic = "force-dynamic";

function readContent() {
  try {
    const contentPath = path.join(process.cwd(), "data", "content.json");
    return JSON.parse(readFileSync(contentPath, "utf-8"));
  } catch {
    return null;
  }
}

export default function Home() {
  const content = readContent();

  return (
    <>
      <Header siteName={content?.site?.name} />
      <main>
        <Hero content={content?.hero} />
        <Features features={content?.features} />
        <Location mapImageUrl={content?.location?.mapImageUrl} />
        <Amenities />
        <FloorPlan />
        <SiteMap sitemap={content?.sitemap} />
        <ReservationForm />
      </main>
      <Footer siteName={content?.site?.name} />
      <FloatingCTA />
    </>
  );
}
