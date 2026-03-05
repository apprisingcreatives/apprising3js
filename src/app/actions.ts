"use server";

import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";
import { Resend } from "resend";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || '';
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        email: email,
      }
    },
  });

  console.log("After signUp", error);


  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  // User record is automatically created by database trigger on auth.users insert
  if (user) {
    console.log('User created successfully:', user.id);
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};
export const addBlogAction = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const excerpt = formData.get("excerpt")?.toString();
  const category = formData.get("category")?.toString();
  const tags = formData.get("tags")?.toString()?.split(',').map(tag => tag.trim()) || [];
  const published = formData.get("published") === "true";
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "You must be logged in to create a blog post");
  }

  if (!title || !content) {
    return encodedRedirect("error", "/dashboard", "Title and content are required");
  }

  // Create slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const { error } = await supabase
    .from('blogs')
    .insert({
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      author_id: user.id,
      category,
      tags,
      published,
      published_at: published ? new Date().toISOString() : null,
    });

  if (error) {
    console.error('Error creating blog post:', error);
    return encodedRedirect("error", "/dashboard", "Failed to create blog post");
  }

  return redirect("/dashboard");
};

export const updateBlogAction = async (blogId: string, formData: FormData) => {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const excerpt = formData.get("excerpt")?.toString();
  const category = formData.get("category")?.toString();
  const tags = formData.get("tags")?.toString()?.split(',').map(tag => tag.trim()) || [];
  const published = formData.get("published") === "true";
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "You must be logged in");
  }

  if (!title || !content) {
    return encodedRedirect("error", "/dashboard", "Title and content are required");
  }

  // Create slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const updateData: any = {
    title,
    slug,
    content,
    excerpt: excerpt || content.substring(0, 200) + '...',
    category,
    tags,
    published,
    updated_at: new Date().toISOString(),
  };

  if (published && !formData.get("wasPublished")) {
    updateData.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('blogs')
    .update(updateData)
    .eq('id', blogId)
    .eq('author_id', user.id);

  if (error) {
    console.error('Error updating blog post:', error);
    return encodedRedirect("error", "/dashboard", "Failed to update blog post");
  }

  return redirect("/dashboard");
};

export const deleteBlogAction = async (blogId: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "You must be logged in");
  }

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', blogId)
    .eq('author_id', user.id);

  if (error) {
    console.error('Error deleting blog post:', error);
    return encodedRedirect("error", "/dashboard", "Failed to delete blog post");
  }

  return redirect("/dashboard");
};
export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const addProjectAction = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "You must be logged in to add a project");
  }

  if (!title) {
    return encodedRedirect("error", "/dashboard", "Project title is required");
  }

  const { error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      title,
      description: description || '',
    });

  if (error) {
    console.error('Error adding project:', error);
    return encodedRedirect("error", "/dashboard", "Failed to add project");
  }

  return redirect("/dashboard");
};

export const deleteProjectAction = async (projectId: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "You must be logged in");
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting project:', error);
    return encodedRedirect("error", "/dashboard", "Failed to delete project");
  }

  return redirect("/dashboard");
};

export const submitContactForm = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const company = formData.get("company")?.toString();
  const projectType = formData.get("projectType")?.toString();
  const budget = formData.get("budget")?.toString();
  const timeline = formData.get("timeline")?.toString();
  const description = formData.get("description")?.toString();

  if (!name || !email || !description) {
    return { error: "Name, email, and description are required" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
      <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
      <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
      <h3>Project Description:</h3>
      <p>${description}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "Contact Form <noreply@apprisingcreatives.com>",
      to: ["info@apprisingcreatives.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { error: "Failed to send email. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
};