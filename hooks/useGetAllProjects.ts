"use client";

import { getAllProjectsAction } from "@/app/server-actions/project/getAllProjects";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";

type Status = "loading" | "success" | "error";

export const useGetAllProjects = () => {
  const searchParams = useSearchParams();

  const desktopPage = Number(searchParams.get("page") || 1);
  const limitUrl = Number(searchParams.get("limit") || 4);
  const limit = Math.min(limitUrl, 5);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [mobilePage, setMobilePage] = useState(1);

  const [projects, setProjects] = useState<any[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [retryLoading, setRetryLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const isFetchingRef = useRef(false);

  const totalPages = Math.ceil(totalCount / limit);

  const hasNextPage = desktopPage < totalPages;
  const hasPrevPage = desktopPage > 1;

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
    };

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const fetchProjects = async (page: number) => {
    const offset = (page - 1) * limit;

    return await getAllProjectsAction({
      limit: String(limit),
      offset: String(offset),
    });
  };

  useEffect(() => {
    if (isMobile === null) return;

    const loadInitial = async () => {
      try {
        setStatus("loading");
        setError(null);

        const page = isMobile ? 1 : desktopPage;

        const result = await fetchProjects(page);

        setProjects(result.projects ?? []);
        setTotalCount(result.totalCount ?? 0);

        pageRef.current = page;

        setStatus("success");
      } catch (err: any) {
        setError(err?.message || "Network Error");
        setStatus("error");
        toast.error(err?.message || "Network Error");
      }
    };

    loadInitial();
  }, [desktopPage, isMobile]);

  const retryGetAllProjects = async () => {
    try {
      setRetryLoading(true);

      const page = isMobile ? 1 : desktopPage;

      const result = await fetchProjects(page);

      setProjects(result.projects ?? []);
      setTotalCount(result.totalCount ?? 0);

      setError(null);
      setStatus("success");
    } catch (err: any) {
      setError(err?.message || "Network Error");
      toast.error(err?.message || "Network Error");
    } finally {
      setRetryLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (!isMobile) return;
    if (isFetchingRef.current) return;
    if (!hasMoreRef.current) return;

    if (projects.length >= totalCount) {
      hasMoreRef.current = false;
      return;
    }

    try {
      isFetchingRef.current = true;
      setLoadingMore(true);

      const nextPage = pageRef.current + 1;

      const result = await Promise.all([
        fetchProjects(nextPage),
        new Promise((res) => setTimeout(res, 2000)),
      ]).then(([data]) => data);

      const newProjects = result.projects ?? [];

      if (newProjects.length === 0) {
        hasMoreRef.current = false;
        return;
      }

      pageRef.current = nextPage;
      setMobilePage(nextPage);

      setProjects((prev) => {
        const ids = new Set(prev.map((item) => item.id));

        const uniqueProjects = newProjects.filter(
          (item: any) => !ids.has(item.id),
        );

        const updated = [...prev, ...uniqueProjects];

        hasMoreRef.current = updated.length < totalCount;

        return updated;
      });
    } catch (err: any) {
      toast.error(err?.message || "Load More Error");
    } finally {
      isFetchingRef.current = false;
      setLoadingMore(false);
    }
  }, [isMobile, projects.length, totalCount]);

  useEffect(() => {
    if (!isMobile) return;

    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.8,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isMobile, loadMore]);

  return {
    projects,
    status,
    error,
    retryLoading,
    retryGetAllProjects,

    totalCount,
    totalPages,

    hasNextPage,
    hasPrevPage,

    page: isMobile ? mobilePage : desktopPage,
    limit,

    isMobile,
    loadMoreRef,
    loadingMore,
  };
};
