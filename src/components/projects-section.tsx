"use client";

import { useState } from "react";
import { Trash2, Plus, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addProjectAction, deleteProjectAction } from "@/app/actions";
import { useFormStatus } from "react-dom";

interface Project {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  status: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add Project"}
    </Button>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <FolderOpen size={24} className="text-primary" />
            Your Projects
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} className="gap-2">
          <Plus size={16} />
          New Project
        </Button>
      </div>

      {/* Add Project Form */}
      {isFormOpen && (
        <Card className="p-6 border-primary/20 bg-primary/5">
          <form action={addProjectAction} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Project Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter project name"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project (optional)"
                className="mt-1 resize-none"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <SubmitButton />
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <FolderOpen
            size={48}
            className="mx-auto mb-4 text-muted-foreground/30"
          />
          <p className="text-muted-foreground mb-4">No projects yet</p>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus size={16} />
            Create Your First Project
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{project.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Created {formatDate(project.created_at)}
                  </p>
                </div>
                <form action={deleteProjectAction.bind(null, project.id)}>
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
              {project.description && (
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
              <div className="mt-3 pt-3 border-t">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {project.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
