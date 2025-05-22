"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";

interface Attempt {
  id: number;
  date: string;
  score: number;
}

interface ExamData {
  id: string;
  title: string;
  bestScore: number;
  attempts: Attempt[];
}

export function ExamPreview({ examId }: { examId: string }) {
  const [examData, setExamData] = useState<ExamData | null>(null);

  useEffect(() => {
    // Simulating an API call to fetch exam data
    const fetchExamData = async () => {
      // In a real application, you would fetch this data from your API
      const mockData: ExamData = {
        id: examId,
        title: "Introduction to React Concepts",
        bestScore: 85,
        attempts: [
          { id: 1, date: "2023-04-15", score: 75 },
          { id: 2, date: "2023-04-20", score: 85 },
          { id: 3, date: "2023-04-25", score: 80 },
        ],
      };
      setExamData(mockData);
    };

    fetchExamData();
  }, [examId]);

  if (!examData) {
    return <></>;
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{examData.title}</CardTitle>
        <CardDescription>Exam ID: {examData.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-semibold">Best Score</span>
          </div>
          <span className="text-2xl font-bold">{examData.bestScore}%</span>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Previous Attempts</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attempt</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examData.attempts.map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell>#{attempt.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(attempt.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{attempt.score}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full hover:cursor-pointer">
          <Link href={`/dashboard/tests/${examId}/take`}>
            Start New Attempt
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
