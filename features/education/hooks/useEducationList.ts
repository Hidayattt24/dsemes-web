"use client";

import { useState, useEffect, useMemo, startTransition } from "react";
import { educationService } from "../services/educationService";
import type { EducationArticle, EducationStats } from "../types/education";

export function useEducationList() {
  const [articles, setArticles] = useState<readonly EducationArticle[]>([]);
  const [stats, setStats] = useState<EducationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchEducationData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [artList, statsData] = await Promise.all([
        educationService.getArticles(),
        educationService.getStats(),
      ]);
      setArticles(artList);
      setStats(statsData);
    } catch {
      setError("Gagal memuat data edukasi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, []);

  // Filtered Articles Memo
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.createdBy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "Semua" || art.category === categoryFilter;

      const matchesStatus =
        statusFilter === "Semua" || art.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [articles, searchQuery, categoryFilter, statusFilter]);

  // Unique categories list for filters
  const categoriesList = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ["Semua", ...Array.from(set)];
  }, [articles]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter]);

  // Paginated Articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const totalCount = filteredArticles.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(totalCount, currentPage * itemsPerPage);

  const deleteArticle = async (id: string) => {
    try {
      const success = await educationService.deleteArticle(id);
      if (success) {
        startTransition(() => {
          fetchEducationData();
        });
      }
    } catch {
      setError("Gagal menghapus artikel.");
    }
  };

  return {
    articles: paginatedArticles,
    stats,
    isLoading,
    error,
    searchQuery,
    categoryFilter,
    statusFilter,
    currentPage,
    totalCount,
    totalPages,
    startItem,
    endItem,
    categoriesList,
    setSearchQuery,
    setCategoryFilter,
    setStatusFilter,
    setCurrentPage,
    refetch: fetchEducationData,
    deleteArticle,
  };
}
