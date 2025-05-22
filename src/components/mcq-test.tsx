"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define question types
type QuestionType = "single" | "multiple";

interface Option {
  option_id: string;
  text: string;
}

interface Question {
  question_id: number;
  text: string;
  mcq_type: QuestionType;
  explanation: string;
  options: Option[];
}

interface MCQTestProps {
  questions: Question[];
  testId: number;
}

export default function MCQTest({ questions, testId }: MCQTestProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle single choice selection
  const handleSingleChoice = (questionId: number, optionId: string) => {
    if (isSubmitted) return;

    setAnswers({
      ...answers,
      [questionId]: [optionId],
    });
  };

  // Handle multiple choice selection
  const handleMultipleChoice = (
    questionId: number,
    optionId: string,
    checked: boolean
  ) => {
    if (isSubmitted) return;

    const currentAnswers = answers[questionId] || [];

    let newAnswers;
    if (checked) {
      newAnswers = [...currentAnswers, optionId];
    } else {
      newAnswers = currentAnswers.filter((id) => id !== optionId);
    }

    setAnswers({
      ...answers,
      [questionId]: newAnswers,
    });
  };

  // Check if an option is selected
  const isOptionSelected = (questionId: number, optionId: string) => {
    return answers[questionId]?.includes(optionId) || false;
  };

  // Submit the test
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Test answers submitted:", answers);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/attempts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            testId,
            answers,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit test");
      }

      setIsSubmitted(true);
      toast.success("Test submitted successfully", {
        description: `Your score: ${data.score}%`,
      });

      // Navigate to the attempts page
      router.push(`/dashboard/tests/${testId}/preview`);
    } catch (error) {
      console.error("Error submitting test:", error);
      toast.error("Error submitting test", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.question_id}>
            <CardHeader>
              <CardTitle className="leading-6">
                <span className="mr-2">Question {index + 1}:</span>
                <span className="font-normal">{question.text}</span>
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {question.mcq_type === "single"
                  ? "Select one answer"
                  : "Select all that apply"}
              </div>
            </CardHeader>
            <CardContent>
              {question.mcq_type === "single" ? (
                <RadioGroup
                  value={answers[question.question_id]?.[0] || ""}
                  className="space-y-3"
                  disabled={isSubmitted}
                >
                  {question.options.map((option) => (
                    <div
                      key={option.option_id}
                      className="flex items-center space-x-2 rounded-md border p-3"
                    >
                      <RadioGroupItem
                        value={option.option_id}
                        id={`q${question.question_id}-${option.option_id}`}
                        onClick={() =>
                          handleSingleChoice(
                            question.question_id,
                            option.option_id
                          )
                        }
                      />
                      <Label
                        htmlFor={`q${question.question_id}-${option.option_id}`}
                        className="flex-grow cursor-pointer"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <div
                      key={option.option_id}
                      className="flex items-center space-x-2 rounded-md border p-3"
                    >
                      <Checkbox
                        id={`q${question.question_id}-${option.option_id}`}
                        checked={isOptionSelected(
                          question.question_id,
                          option.option_id
                        )}
                        onCheckedChange={(checked) =>
                          handleMultipleChoice(
                            question.question_id,
                            option.option_id,
                            checked as boolean
                          )
                        }
                        disabled={isSubmitted}
                      />
                      <Label
                        htmlFor={`q${question.question_id}-${option.option_id}`}
                        className="flex-grow cursor-pointer"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {!isSubmitted && (
          <Button
            onClick={handleSubmit}
            size="lg"
            className="cursor-pointer"
            disabled={
              Object.keys(answers).length < questions.length || isSubmitting
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </Button>
        )}
      </div>
    </div>
  );
}
