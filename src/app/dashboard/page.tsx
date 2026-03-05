import DashboardNavbar from "@/components/dashboard-navbar";
import ProjectsSection from "@/components/projects-section";
import BlogsSection from "@/components/blogs-section";
import {
  InfoIcon,
  UserCircle,
  Mail,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Shield,
  Key,
} from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signOutAction } from "@/app/actions";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  const createdDate = user.created_at
    ? (() => {
        try {
          return new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        } catch {
          return "Unknown";
        }
      })()
    : "Unknown";

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gradient-to-b from-background to-muted/20 min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userProfile?.full_name || user.email}
            </p>
          </header>

          <div className="bg-blue-500/10 border border-blue-500/20 text-sm p-4 px-6 rounded-lg text-blue-700 dark:text-blue-400 flex gap-3 items-center mb-8">
            <InfoIcon size={16} className="flex-shrink-0" />
            <span>
              This is a protected page visible only to authenticated users
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="md:col-span-2 overflow-hidden">
              <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <UserCircle size={40} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-2xl">
                      {userProfile?.full_name || "User"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Mail
                      size={18}
                      className="text-primary mt-1 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium break-all">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar
                      size={18}
                      className="text-primary mt-1 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Member Since
                      </p>
                      <p className="font-medium">{createdDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Settings size={20} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/dashboard/reset-password" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <span>
                      <Key size={16} />
                      Change Password
                    </span>
                  </Button>
                </Link>
                <form action={signOutAction}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    type="submit"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-primary" />
                <h3 className="font-bold text-lg">Security</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">
                    Password Protection
                  </span>
                  <span className="text-green-600 font-medium">✓ Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Email Verified</span>
                  <span
                    className={
                      user.email_confirmed_at
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {user.email_confirmed_at ? "✓ Verified" : "Pending"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  Keep your account secure by regularly updating your password.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell size={20} className="text-primary" />
                <h3 className="font-bold text-lg">Preferences</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">
                    Email Notifications
                  </span>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">
                    Marketing Emails
                  </span>
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 text-muted-foreground px-2 py-1 rounded">
                    Disabled
                  </span>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  Manage your communication preferences anytime.
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-6 mb-8">
            <ProjectsSection projects={projects || []} />
          </Card>

          <Card className="p-6 mb-8">
            <BlogsSection blogs={blogs || []} />
          </Card>

          <Card className="p-6 bg-muted/30">
            <h3 className="font-bold mb-3 text-sm">Account Details</h3>
            <details className="cursor-pointer group">
              <summary className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Show raw data
              </summary>
              <div className="bg-muted/50 rounded-lg p-3 mt-3 overflow-hidden">
                <pre className="text-xs font-mono max-h-64 overflow-auto">
                  {JSON.stringify(
                    { auth: user, profile: userProfile },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </details>
          </Card>
        </div>
      </main>
    </>
  );
}
