"use client";

import { MoreHorizontal, FileText, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteTest } from "@/app/dashboard/deleteTest";
import { MouseEventHandler } from "react";

export interface TestCardProps {
  id: number;
  title: string;
  date: Date;
  questions: number;
}

export function TestCard({ id, title, date, questions }: TestCardProps) {
  const handleDelete: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    await deleteTest(id);

    alert(`Successfully deleted test: ${title}`)

    window.location.reload();
  };

  return (
    <Card className="gap-y-3">
      <CardHeader className="flex flex-row items-start justify-between gap-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:cursor-pointer"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem asChild>
              <Link href={`/dashboard/tests/${testSlug}/take`}>Take Test</Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={handleDelete} className="hover:cursor-pointer">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{questions} questions</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          Updated {timeAgo(date)}
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href={`/dashboard/tests/${id}/preview`}>
            <PlayCircle className="mr-1 h-3.5 w-3.5" />
            Take Test
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44); // average month
  const years = Math.floor(days / 365.25); // average year

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  return "just now";
}
