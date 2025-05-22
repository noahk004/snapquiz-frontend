"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, PlayIcon, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ArrowLeft } from "lucide-react";

export interface QuizData {
  error?: string;
  success: boolean;
  id: number;
  title: string;
  score: string; // could be changed to `number` if parsed
  created_at: string; // ISO timestamp
  questions: Question[];
}

interface Question {
  questionId: number;
  text: string;
  type: "single" | "multiple";
  explanation: string;
  score: number;
  options: Option[];
}

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
}

export default function ViewAttemptComponent({
  testData,
}: {
  testData: QuizData | null;
}) {
  if (!testData) {
    return <div>Uh oh! Something went wrong while loading your test data.</div>;
  }

  const calculateScore = (data: QuizData) => {
    let totalScore = 0;
    let totalPossible = 0;

    for (const question of data.questions) {
      totalPossible += 1;

      const correctOptions = question.options.filter((opt) => opt.isCorrect);
      const selectedOptions = question.options.filter((opt) => opt.isSelected);

      if (question.type === "single") {
        if (selectedOptions.length === 1 && selectedOptions[0].isCorrect) {
          totalScore += 1;
        }
      } else if (question.type === "multiple") {
        const selectedCorrect = selectedOptions.filter(
          (opt) => opt.isCorrect
        ).length;
        const selectedIncorrect = selectedOptions.filter(
          (opt) => !opt.isCorrect
        ).length;

        totalScore += Math.max(
          0,
          (selectedCorrect - selectedIncorrect) / correctOptions.length
        );
      }
    }

    const percentage = (totalScore / totalPossible) * 100;

    return {
      fraction: `${totalScore.toFixed(2)}/${totalPossible}`,
      percentage: `${percentage.toFixed(2)}`,
    };
  };

  const score = calculateScore(testData);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="../preview">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Test Preview
          </Link>
        </Button>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">{testData.title}</CardTitle>
              <CardDescription>
                Attempt made on {formatDate(testData.created_at)}
              </CardDescription>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="text-3xl font-bold">{score.percentage}%</div>
              <div className="text-muted-foreground">
                Score: {score.fraction}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={parseFloat(score.percentage)} className="h-2" />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Accordion type="multiple" className="space-y-4">
          {testData.questions.map((question: Question, index: number) => {
            return (
              <AccordionItem
                key={question.questionId}
                value={question.questionId.toString()}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          question.type === "single"
                            ? question.options.find((opt) => opt.isCorrect)
                                ?.isSelected
                              ? "success"
                              : "destructive"
                            : (() => {
                                let correctCount = 0;
                                let incorrectCount = 0;
                                for (const option of question.options) {
                                  if (option.isCorrect) {
                                    correctCount++;
                                  } else {
                                    incorrectCount++;
                                  }
                                }
                                if (correctCount > 0 && incorrectCount === 0) {
                                  return "success";
                                } else if (
                                  correctCount > 0 &&
                                  incorrectCount > 0
                                ) {
                                  return "warning";
                                } else {
                                  return "destructive";
                                }
                              })()
                        }
                      >
                        {question.type === "single"
                          ? question.options.find((opt) => opt.isCorrect)
                              ?.isSelected
                            ? "Correct"
                            : "Incorrect"
                          : (() => {
                              let correctCount = 0;
                              let incorrectCount = 0;
                              for (const option of question.options) {
                                if (option.isCorrect) {
                                  correctCount++;
                                } else {
                                  incorrectCount++;
                                }
                              }
                              if (correctCount > 0 && incorrectCount === 0) {
                                return "Correct";
                              } else if (
                                correctCount > 0 &&
                                incorrectCount > 0
                              ) {
                                return "Partially Correct";
                              } else {
                                return "Incorrect";
                              }
                            })()}
                      </Badge>
                      <Badge variant="outline">
                        {question.type === "single"
                          ? "Single Choice"
                          : "Multiple Choice"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      {index + 1}. {question.text}
                    </h3>
                  </div>
                  <AccordionTrigger className="ml-2" />
                </div>

                <AccordionContent className="pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {question.options.map((option) => {
                        const isSelected = option.isSelected;
                        const isCorrect = option.isCorrect;

                        return (
                          <div
                            key={option.id}
                            className={`flex items-start p-3 rounded-md ${
                              isSelected && isCorrect
                                ? "bg-green-50 border border-green-200" // Correct and selected
                                : isSelected && !isCorrect
                                ? "bg-red-50 border border-red-200" // Incorrect but selected
                                : !isSelected && isCorrect
                                ? "bg-amber-50 border border-amber-200" // Correct but not selected
                                : "bg-gray-50 border border-gray-200" // Incorrect and not selected
                            }`}
                          >
                            <div
                              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                isSelected && isCorrect
                                  ? "bg-green-500 text-white" // Correct and selected
                                  : isSelected && !isCorrect
                                  ? "bg-red-500 text-white" // Incorrect but selected
                                  : !isSelected && isCorrect
                                  ? "bg-amber-500 text-white" // Correct but not selected
                                  : "bg-gray-200" // Incorrect and not selected
                              }`}
                            >
                              {isSelected && isCorrect && (
                                <Check className="w-4 h-4" />
                              )}
                              {isSelected && !isCorrect && (
                                <X className="w-4 h-4" />
                              )}
                              {!isSelected && isCorrect && (
                                <Check className="w-4 h-4 opacity-50" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className={`${
                                  isSelected && isCorrect
                                    ? "text-green-800" // Correct and selected
                                    : isSelected && !isCorrect
                                    ? "text-red-800" // Incorrect but selected
                                    : !isSelected && isCorrect
                                    ? "text-amber-800" // Correct but not selected
                                    : "text-gray-800" // Incorrect and not selected
                                }`}
                              >
                                {option.text}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Explanation:</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-200">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="flex justify-center my-4">
        <Link href={`../take`} passHref>
          <Button className="cursor-pointer">
            <PlayIcon className="h-4 w-4" />
            Retake Exam
          </Button>
        </Link>
      </div>
    </div>
  );
}
