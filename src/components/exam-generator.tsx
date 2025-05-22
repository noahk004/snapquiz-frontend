"use client";

import type React from "react";

import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "./slider";
import { redirect } from "next/navigation";

export default function ExamGenerator() {
  const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file/* || !title */) return;

    setIsLoading(true);

    const formData = new FormData()
    formData.append("file", file)
    // formData.append("title", title)
    formData.append("questionCount", questionCount.toString())
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/generate`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })

    console.log(response)

    setIsLoading(false);
    if (response.ok) {
      redirect("/dashboard");
    } else {
      console.error("Failed to generate exam.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle>Create New Exam</CardTitle>
        <CardDescription>
          Upload a document and customize your exam settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div className="space-y-2">
            <Label htmlFor="title">Exam Title</Label>
            <Input
              id="title"
              placeholder="Enter exam title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="document">Upload Document</Label>
            <div className="grid gap-2">
              <Label
                htmlFor="document"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer ${
                  file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {file ? (
                  <div className="flex flex-col items-center justify-center text-green-600">
                    <FileText className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Upload className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs">PDF, DOCX, or TXT (max 10MB)</p>
                  </div>
                )}
              </Label>
              <Input
                id="document"
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                required
                disabled={isLoading}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="questionCount">
                Number of Questions: {questionCount}
              </Label>
              <span className="text-sm text-gray-500">3-30 questions</span>
            </div>
            <div className="pt-2 px-1">
              <Slider
                id="questionCount"
                min={3}
                max={30}
                step={1}
                value={[questionCount]}
                onValueChange={(value) => setQuestionCount(value[0])}
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>3</span>
              <span>15</span>
              <span>30</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer mb-2"
            disabled={isLoading || !file/* || !title */}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Exam...
              </span>
            ) : (
              "Generate Exam"
            )}
          </Button>

          {isLoading && (
            <div className="text-xs text-gray-500 animate-pulse">
              This process may take roughly 1 to 2 minutes.
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <p>Supported formats: PDF, DOCX, TXT</p>
        <p>Max file size: 10MB</p>
      </CardFooter>
    </Card>
  );
}
