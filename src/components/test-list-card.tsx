import { MoreHorizontal, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { TestCardProps, timeAgo } from "./test-card";
import { deleteTest } from "@/app/dashboard/deleteTest";
import { MouseEventHandler } from "react";

export default function TestListCard({
  id,
  title,
  date,
  questions,
}: TestCardProps) {
  const handleDelete: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    await deleteTest(id);

    window.location.reload();
  };
  return (
    <Card className="py-3 gap-y-2">
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={`/dashboard/tests/${id}/preview`}>
                <PlayCircle className="mr-1 h-3.5 w-3.5" />
                Take Test
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:cursor-pointer"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="hover:cursor-pointer"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="py-4 border-t">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div>{questions} questions</div>
          <div>Updated {timeAgo(date)}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
