import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Data Protection & Privacy | NexusAI",
  description:
    "NexusAI's privacy policy explains how we collect, use, and protect your personal information. Learn about our data protection practices and your privacy rights.",
  keywords:
    "privacy policy, data protection, GDPR compliance, privacy rights, data security, personal information protection",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar user={false} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Privacy <span className="text-cyan-500">Policy</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              How we collect, use, and protect your personal information.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
              <p className="text-sm text-slate-500 mb-8">
                Last updated: March 5, 2026
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  We collect information you provide directly to us, such as
                  when you create an account, use our services, or contact us
                  for support. This may include:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                  <li>Name and contact information</li>
                  <li>Account credentials</li>
                  <li>Project information and data</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>
                    Communicate with you about products, services, and
                    promotions
                  </li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  3. Information Sharing
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except as
                  described in this policy. We may share your information in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                  <li>
                    With service providers who assist us in operating our
                    platform
                  </li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>In connection with a business transfer</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  4. Data Security
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  5. Your Rights
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  6. Cookies and Tracking
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  We use cookies and similar technologies to enhance your
                  experience, analyze usage, and assist in our marketing
                  efforts. You can control cookie preferences through your
                  browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  7. Changes to This Policy
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  We may update this privacy policy from time to time. We will
                  notify you of any material changes by posting the new policy
                  on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  8. Contact Us
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  If you have any questions about this privacy policy, please
                  contact us at:
                </p>
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-slate-700 dark:text-slate-300">
                    Email: privacy@nexusai.com
                    <br />
                    Address: 123 Innovation Drive, Tech City, TC 12345
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
