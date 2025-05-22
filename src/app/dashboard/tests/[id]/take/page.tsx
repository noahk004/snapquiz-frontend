import { cookies } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import MCQTest from "@/components/mcq-test";
import { ChevronLeft } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tests/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    }
  );

  const test = await response.json();

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 hover:cursor-pointer"
          asChild
        >
          <Link href={`/dashboard/tests/${params.id}/preview`}>
            <ChevronLeft className="h-4 w-4" />
            Exit Test
          </Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">{test.title}</h1>
      <MCQTest
        questions={test.questions}
        testId={Number(params.id)}
      />
    </main>
  );
}
