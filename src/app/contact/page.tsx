import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact NexusAI - Get Your AI Project Started Today",
  description:
    "Contact NexusAI today to discuss your AI and machine learning needs. Schedule a consultation with our expert team to transform your business with intelligent solutions.",
  keywords:
    "contact NexusAI, AI consultation, get in touch, project inquiry, AI services, machine learning consultation",
};

export default function ContactPage() {
  return (
    <>
      <Navbar user={false} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Get In <span className="text-cyan-500">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Ready to transform your business with AI? Let's discuss how we can
              help you build intelligent, scalable systems that drive real
              results.
            </p>
          </div>

          <div className="grid lg:grid-cols-10 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">
                  Let's Start a Conversation
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Whether you're looking to integrate AI into your existing
                  systems, build custom solutions, or need technical consulting,
                  we're here to help.
                </p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Mail className="w-5 h-5 text-cyan-500" />
                      Email Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      <a
                        href="mailto:info@apprisingcreatives.com"
                        className="hover:text-cyan-500 transition-colors"
                      >
                        info@apprisingcreatives.com
                      </a>
                    </CardDescription>
                    <p className="text-sm text-slate-500 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Phone className="w-5 h-5 text-cyan-500" />
                      Call Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      <a
                        href="tel:+639204786075"
                        className="hover:text-cyan-500 transition-colors"
                      >
                        +63 920 478 6075
                      </a>
                    </CardDescription>
                    <p className="text-sm text-slate-500 mt-1">
                      Available for calls and inquiries
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="w-5 h-5 text-cyan-500" />
                      Visit Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Dela Torre Compound
                      <br />
                      Dawis Street, Tabunoc
                      <br />
                      Talisay City, Cebu
                      <br />
                      Philippines 6045
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
