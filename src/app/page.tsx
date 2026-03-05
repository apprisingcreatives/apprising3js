import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import BenefitsSection from "@/components/benefits-section";
import PortfolioGrid from "@/components/portfolio-grid";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import ContactForm from "@/components/contact-form";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch all projects from the database
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <BenefitsSection />
      <PortfolioGrid projects={projects || []} />
      <ServicesSection />
      <AboutSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
