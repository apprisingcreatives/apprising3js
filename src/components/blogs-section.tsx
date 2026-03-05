"use client";

import { useState } from "react";
import { Trash2, Plus, FileText, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  addBlogAction,
  updateBlogAction,
  deleteBlogAction,
} from "@/app/actions";
import { useFormStatus } from "react-dom";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface BlogsSectionProps {
  blogs: Blog[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create Blog Post"}
    </Button>
  );
}

export default function BlogsSection({ blogs }: BlogsSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingBlog(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <FileText size={24} className="text-primary" />
            Blog Posts
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {blogs.length} blog post{blogs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} className="gap-2">
          <Plus size={16} />
          New Blog Post
        </Button>
      </div>

      {/* Add/Edit Blog Form */}
      {isFormOpen && (
        <Card className="p-6 border-primary/20 bg-primary/5">
          <form
            action={
              editingBlog
                ? updateBlogAction.bind(null, editingBlog.id)
                : addBlogAction
            }
            className="space-y-4"
          >
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Blog Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                required
                className="mt-1"
                defaultValue={editingBlog?.title || ""}
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g., AI Trends, Technical, DevOps"
                className="mt-1"
                defaultValue={editingBlog?.category || ""}
              />
            </div>
            <div>
              <Label htmlFor="tags" className="text-sm font-medium">
                Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g., AI, Machine Learning, Python"
                className="mt-1"
                defaultValue={editingBlog?.tags?.join(", ") || ""}
              />
            </div>
            <div>
              <Label htmlFor="excerpt" className="text-sm font-medium">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Brief summary of the blog post"
                className="mt-1 resize-none"
                rows={2}
                defaultValue={editingBlog?.excerpt || ""}
              />
            </div>
            <div>
              <Label htmlFor="content" className="text-sm font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your blog post content here..."
                className="mt-1 resize-none"
                rows={8}
                required
                defaultValue={editingBlog?.content || ""}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                name="published"
                defaultChecked={editingBlog?.published || false}
              />
              <Label htmlFor="published" className="text-sm font-medium">
                Publish immediately
              </Label>
            </div>
            {editingBlog && (
              <input
                type="hidden"
                name="wasPublished"
                value={editingBlog.published.toString()}
              />
            )}
            <div className="flex gap-2">
              <SubmitButton />
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText
            size={48}
            className="mx-auto mb-4 text-muted-foreground/30"
          />
          <p className="text-muted-foreground mb-4">No blog posts yet</p>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus size={16} />
            Create Your First Blog Post
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{blog.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Created {formatDate(blog.created_at)}
                    {blog.published_at && (
                      <> • Published {formatDate(blog.published_at)}</>
                    )}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(blog)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Edit
                  </Button>
                  <form action={deleteBlogAction.bind(null, blog.id)}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </form>
                </div>
              </div>
              {blog.category && (
                <div className="mb-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {blog.category}
                  </span>
                </div>
              )}
              {blog.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.excerpt}
                </p>
              )}
              <div className="mt-3 pt-3 border-t flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {blog.published ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                  <span
                    className={`text-xs ${blog.published ? "text-green-600" : "text-gray-500"}`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex gap-1">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{blog.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
