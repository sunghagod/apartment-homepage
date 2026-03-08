import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PromoBanner from "@/components/PromoBanner";
import Location from "@/components/Location";
import Amenities from "@/components/Amenities";
import FloorPlan from "@/components/FloorPlan";
import SiteMap from "@/components/SiteMap";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { getContent } from "@/lib/content-store";

export const revalidate = 60;

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header siteName={content?.site?.name} />
      <main>
        <Hero content={content?.hero} />
        <Features features={content?.features} />
        <PromoBanner banners={content?.banners} />
        <Location mapImageUrl={content?.location?.mapImageUrl} schoolImageUrl={content?.location?.schoolImageUrl} />
        <Amenities />
        <FloorPlan floorPlans={content?.floorPlans} />
        <SiteMap sitemap={content?.sitemap} />
        <ReservationForm />
      </main>
      <Footer siteName={content?.site?.name} />
      <FloatingCTA />
    </>
  );
}
