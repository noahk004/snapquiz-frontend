"use client";

import Link from "next/link";
import { PlusCircle, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestCard } from "@/components/test-card";

import { MetaTest } from "../types";
import TestListCard from "@/components/test-list-card";

export default function DashboardPage({ tests }: { tests: MetaTest[] | null }) {
  const sortedTests = tests?.sort((a, b) => new Date(b.generated_at).getTime() - new Date(a.generated_at).getTime()) ?? null;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SnapQuiz</h1>
          <p className="text-muted-foreground">
            Create and manage your AI-generated tests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/tests/create">
              <PlusCircle className="h-4 w-4" />
              New Test
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-muted-foreground"
            title="Log out"
          >
            <Link href="/logout">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Your Exams</h2>
          {/* <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search tests..." className="w-full pl-8" />
          </div> */}
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{sortedTests ? sortedTests.length : 0}</strong> test
              {sortedTests && sortedTests.length > 1 && "s"}
            </div>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="grid" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedTests?.map((test: MetaTest) => (
                <TestCard
                  key={test.id}
                  id={test.id}
                  title={test.title}
                  date={test.generated_at}
                  questions={test.num_questions}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="list" className="mt-6">
            <div className="grid gap-4">
              {sortedTests?.map((test: MetaTest) => (
                <TestListCard
                  key={test.id}
                  id={test.id}
                  title={test.title}
                  date={test.generated_at}
                  questions={test.num_questions}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
