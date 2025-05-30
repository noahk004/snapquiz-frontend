import ExamGenerator from "@/components/exam-generator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import AuthGuard from "@/components/guards/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <main className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          asChild
        >
          <a href="/dashboard">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </a>
        </Button>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">Generate New Exam</h1>

        <ExamGenerator />
      </main>
    </AuthGuard>
  );
}
