"use client";

import { TopArticlesTable } from "@/components/dashboard/TopArticlesTable";
import { useTopArticles }   from "@/features/dashboard/hooks/useTopArticles";

export function DashboardArticleTable() {
  const { articles, isLoading } = useTopArticles();
  return <TopArticlesTable articles={articles} loading={isLoading} />;
}
