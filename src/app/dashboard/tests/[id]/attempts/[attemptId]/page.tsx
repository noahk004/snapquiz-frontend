import { cookies } from "next/headers";
import ViewAttemptComponent, {
  QuizData,
} from "@/components/ViewAttemptComponent";

import AuthGuard from "@/components/guards/AuthGuard";

type Props = {
  params: {
    id: string;
    attemptId: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function TestAttemptPage({ params }: Props) {
  let testData: QuizData | null = null;
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/attempts/attempts/${params.attemptId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      }
    );

    testData = await data.json();

    if (!testData || testData.error) {
      throw new Error(testData?.error);
    }

    console.log(testData);
  } catch (error) {
    console.error("Error fetching test data:", error);
  }

  return (
    <AuthGuard>
      <ViewAttemptComponent testData={testData} />
    </AuthGuard>
  );
}
