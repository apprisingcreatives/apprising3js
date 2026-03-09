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
import { Calendar, User, ArrowRight } from "lucide-react";
import { createClient } from "../../../supabase/server";
import { Suspense } from "react";

const getBlogPosts = async () => {
  const supabase = await createClient();

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select(
      `
      *,
      users!blogs_author_id_fkey (
        name,
        full_name,
        email
      )
    `,
    )
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }

  return blogs || [];
};

export const metadata: Metadata = {
  title:
    "AI & Machine Learning Blog - Expert Insights & Technology Trends | NexusAI",
  description:
    "Read expert insights on AI, machine learning, enterprise solutions, and technology trends. Stay informed with NexusAI's latest articles and industry analysis.",
  keywords:
    "AI blog, machine learning articles, technology insights, enterprise AI trends, artificial intelligence news, technical consulting tips",
};

function BlogContent({ blogPosts }: { blogPosts: any[] }) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Draft";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Draft";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Our <span className="text-cyan-500">Blog</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Insights, trends, and expert perspectives on AI, machine learning,
              and the future of intelligent systems.
            </p>
          </div>

          {/* Featured Post */}
          {blogPosts.length > 0 && (
            <div className="mb-16">
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 bg-gradient-to-br from-cyan-500 to-teal-600 p-8 text-white">
                    <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
                      Featured
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-white/90 mb-6">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-white/80 mb-6">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blogPosts[0].users?.full_name ||
                          blogPosts[0].users?.name ||
                          blogPosts[0].users?.email ||
                          "Anonymous"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blogPosts[0].published_at)}
                      </div>
                    </div>
                    <Button className="bg-white text-cyan-600 hover:bg-white/90">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="md:w-1/2 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-8">
                    <div className="text-center text-slate-500 dark:text-slate-400">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                      </div>
                      <p>Featured blog post image</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">
                      {post.category || "Uncategorized"}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {Math.ceil(post.content?.length / 200) || 1} min read
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.users?.full_name ||
                        post.users?.name ||
                        post.users?.email ||
                        "Anonymous"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.published_at)}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>
                  Get the latest insights and updates delivered to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <Button className="bg-cyan-500 hover:bg-cyan-600">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg mb-6 animate-pulse"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded max-w-3xl mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent blogPosts={blogPosts} />
    </Suspense>
  );
}
