import Link from "next/link";
import { cookies } from "next/headers";
import {
  CalendarIcon,
  ClockIcon,
  TrophyIcon,
  HistoryIcon,
  PlayIcon,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AuthGuard from "@/components/guards/AuthGuard";

export default async function TestPreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/attempts/all-test-attempts/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    }
  );

  const testData = await response.json();
  console.log(testData);

  let bestAttempt = null;
  if (testData.attempts.length > 0) {
    bestAttempt = [...testData.attempts].sort((a, b) => b.score - a.score)[0];
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AuthGuard>
      <div className="container max-w-4xl py-8 mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>

        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {testData.test.title}
          </h1>
          <p className="text-muted-foreground">
            Review your progress and track your top performance before starting
            the test.
          </p>
        </div>

        {bestAttempt ? (
          <div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Test Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Test Information
                  </CardTitle>
                  <CardDescription>
                    Details about this assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{testData.test.questionCount * 3} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {testData.test.questionCount} questions
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Note: Questions will only be revealed once you start the
                    test.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/dashboard/tests/${params.id}/take`}
                    className="w-full"
                  >
                    <Button className="w-full cursor-pointer" size="lg">
                      <PlayIcon className="mr-2 h-4 w-4" />
                      Start Test
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Best Attempt */}
              <Card className="border-2 border-green-100 dark:border-green-900 py-0">
                <CardHeader className="bg-green-100 dark:bg-green-950/30 py-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-xl">
                      <TrophyIcon className="mr-2 h-5 w-5 text-yellow-500" />
                      Best Attempt
                    </CardTitle>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {bestAttempt.score}%
                    </Badge>
                  </div>
                  <CardDescription>
                    Completed on {formatDate(bestAttempt.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Score
                      </span>
                      <span className="font-medium">{bestAttempt.score}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${bestAttempt.score}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Previous Attempts */}
            <Card className="mt-8 mb-0 pb-0">
              <CardHeader>
                <div className="flex items-center">
                  <HistoryIcon className="mr-2 h-5 w-5" />
                  <CardTitle>Previous Attempts</CardTitle>
                </div>
                <CardDescription>Your test history</CardDescription>
              </CardHeader>
              <CardContent>
                {testData.attempts.length > 0 ? (
                  <div className="space-y-4">
                    {testData.attempts.map(
                      (
                        attempt: { id: string; date: string; score: number },
                        index: number
                      ) => (
                        <div key={attempt.id}>
                          {index > 0 && <Separator className="my-4" />}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(attempt.date)}
                                </span>
                              </div>
                              <Link
                                href={`/dashboard/tests/${params.id}/attempts/${attempt.id}`}
                                className="mt-1 font-medium hover:underline underline-offset-4"
                              >
                                Attempt #{testData.attempts.length - index}
                              </Link>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={
                                  attempt.id === bestAttempt.id
                                    ? "default"
                                    : "outline"
                                }
                                className={
                                  attempt.id === bestAttempt.id
                                    ? "bg-green-500 hover:bg-green-600"
                                    : ""
                                }
                              >
                                {attempt.score}%
                              </Badge>
                              {attempt.id === bestAttempt.id && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  Best score
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-6">
                    You haven&apos;t attempted this test yet.
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t bg-muted/50 px-6 pb-6">
                <Link href={`/dashboard/tests/${params.id}/take`} passHref>
                  <Button variant="outline" className="w-full cursor-pointer">
                    <PlayIcon className="h-4 w-4" />
                    Start New Attempt
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Test Information
                </CardTitle>
                <CardDescription>Details about this assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{testData.test.questionCount * 3} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {testData.test.questionCount} questions
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  This will be your first attempt. Questions will only be
                  revealed once you start the test.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/dashboard/tests/${params.id}/take`}
                  className="w-full"
                >
                  <Button className="w-full cursor-pointer" size="lg">
                    <PlayIcon className="mr-2 h-4 w-4" />
                    Start Test
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <div className="flex items-center">
                  <HistoryIcon className="mr-2 h-5 w-5" />
                  <CardTitle>No Previous Attempts</CardTitle>
                </div>
                <CardDescription>
                  You haven&apos;t taken this test yet
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Your test history and performance metrics will appear here
                  after your first attempt.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
