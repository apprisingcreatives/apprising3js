import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers at NexusAI - Join Our AI & ML Expert Team",
  description:
    "Join NexusAI's talented team of AI and machine learning experts. Explore open positions in software development, AI engineering, and technical roles.",
  keywords:
    "careers, jobs, hiring, AI engineer, machine learning developer, technical positions, employment opportunities",
};

const jobOpenings = [
  {
    id: 1,
    title: "Senior AI Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    description:
      "Lead the development of cutting-edge AI solutions and mentor junior engineers.",
    requirements: [
      "5+ years AI/ML experience",
      "Python, TensorFlow/PyTorch",
      "Team leadership",
    ],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description:
      "Build scalable web applications using modern technologies and frameworks.",
    requirements: [
      "3+ years full-stack experience",
      "React/Next.js",
      "Node.js",
      "PostgreSQL",
    ],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    description:
      "Design and maintain our cloud infrastructure and deployment pipelines.",
    requirements: [
      "4+ years DevOps experience",
      "AWS/GCP",
      "Docker/Kubernetes",
      "CI/CD",
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      <Navbar user={false} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Join Our <span className="text-cyan-500">Team</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Help us build the future of intelligent systems. We're looking for
              passionate individuals who want to make a difference in how
              organizations leverage AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                View Open Positions
              </Button>
              <Button size="lg" variant="outline">
                Learn About Our Culture
              </Button>
            </div>
          </div>

          {/* Why Join Us */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-cyan-500">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Work on cutting-edge AI projects that push the boundaries of
                  what's possible.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-cyan-500">Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Your work will directly impact how organizations transform
                  their operations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-cyan-500">Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Continuous learning opportunities and career development
                  support.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-8 text-center">
              Open Positions
            </h2>
            <div className="grid gap-6">
              {jobOpenings.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {job.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Clock className="w-3 h-3" />
                          {job.type}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <DollarSign className="w-3 h-3" />
                          {job.salary}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <Button className="bg-cyan-500 hover:bg-cyan-600">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Don't see the perfect role?</CardTitle>
                <CardDescription>
                  We're always interested in meeting talented individuals. Send
                  us your resume and let's talk.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
