import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Status = "loading" | "success" | "error";

type FunctionCall = (params: Record<string, unknown>) => Promise<{
  data: any[];
  totalCount: number;
}>;

export const usePaginationData = (
  functionCall: FunctionCall,
  limit: number,
  anotherParams?: Record<string, unknown>,
  enabled = true
) => {
  const searchParams = useSearchParams();
  const desktopPage = Number(searchParams.get("page") || 1);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [mobilePage, setMobilePage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const MAX_LIMIT = 5;

  const searchValue = anotherParams?.searchValue;

  const limitUrl = Number(searchParams.get("limit") || limit);

  const finalLimit = isMobile ? limit : Math.min(limitUrl, MAX_LIMIT);
  const [data, setData] = useState<any[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  const [retryLoading, setRetryLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const isFetchingRef = useRef(false);

  const totalPages = Math.ceil(totalCount / finalLimit);

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

  useEffect(() => {
    if (!isMobile) return;

    pageRef.current = 1;
    hasMoreRef.current = true;
    isFetchingRef.current = false;

    setMobilePage(1);
  }, [isMobile]);

  const fetchData = async (page: number) => {
    const offset = (page - 1) * finalLimit;

    return functionCall({
      limit: String(finalLimit),
      offset: String(offset),
      ...anotherParams,
    });
  };

  const loadinitialData = async () => {
    try {
      setStatus("loading");
      setError(null);

      const page = isMobile ? 1 : desktopPage;

      const result = await fetchData(page);
      console.log(result.data);
      console.log(result.totalCount);
      setData(result.data ?? []);
      setTotalCount(result.totalCount ?? 0);
      hasMoreRef.current = (result.data?.length ?? 0) < (result.totalCount ?? 0);
      pageRef.current = page;
      setStatus("success");
      return result.data;
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!enabled) return;
    if (isMobile === null) return;

    loadinitialData();
  }, [desktopPage, isMobile, enabled, searchValue]);

  const retryGetData = async () => {
    try {
      setStatus("loading");
      const page = isMobile ? 1 : desktopPage;

      const result = await fetchData(page);

      setData(result.data ?? []);
      setTotalCount(result.totalCount ?? 0);

      setError(null);

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  };

  const nextPage = () => {
    if (!hasNextPage) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(desktopPage + 1));

    router.push(`${pathname}?${params.toString()}`);
  };

  const prevPage = () => {
    if (!hasPrevPage) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(desktopPage - 1));

    router.push(`${pathname}?${params.toString()}`);
  };
  const loadMore = useCallback(async () => {
    if (!isMobile || isFetchingRef.current || !hasMoreRef.current) return;

    if (data.length >= totalCount) {
      hasMoreRef.current = false;
      return;
    }

    try {
      isFetchingRef.current = true;

      setLoadingMore(true);

      const nextPage = pageRef.current + 1;

      const result = await fetchData(nextPage);

      const newItems = result.data ?? [];

      if (newItems.length === 0) {
        hasMoreRef.current = false;

        return;
      }

      pageRef.current = nextPage;

      setMobilePage(nextPage);

      setData((prev) => {
        const updated = [...prev, ...newItems];

        hasMoreRef.current = updated.length < result.totalCount;

        return updated;
      });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      isFetchingRef.current = false;

      setLoadingMore(false);
    }
  }, [isMobile, data.length, totalCount]);

  useEffect(() => {
    if (!enabled) return;

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
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isMobile, loadMore]);

  return {
    data,

    status,
    error,

    retryGetData,
    retryLoading,

    totalCount,
    totalPages,

    hasNextPage,
    hasPrevPage,

    page: isMobile ? mobilePage : desktopPage,

    finalLimit,

    isMobile,

    loadMoreRef,

    loadingMore,
    loadinitialData,
    nextPage,
    prevPage,
  };
};
