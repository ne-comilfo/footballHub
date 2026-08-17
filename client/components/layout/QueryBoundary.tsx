import type { ReactNode } from "react";
import Empty from "./Empty";
import ErrorState from "./Error";
import Loading from "./Loading";

type QueryLike<T> = {
  data: T | undefined;
  isPending: boolean;
  error: unknown;
};

type QueryBoundaryProps<T> = {
  query: QueryLike<T>;
  title?: ReactNode;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
  isEmpty?: (data: NonNullable<T>) => boolean;
  children: (data: NonNullable<T>) => ReactNode;
};

export default function QueryBoundary<T>({
  query,
  title,
  loadingText = "Загрузка...",
  errorText = "Ошибка при загрузке данных",
  emptyText = "Нет данных",
  isEmpty,
  children,
}: QueryBoundaryProps<T>) {
  if (query.isPending) {
    return (
      <>
        {title}
        <Loading loadingText={loadingText} />
      </>
    );
  }

  if (query.error) {
    return (
      <>
        {title}
        <ErrorState errorText={errorText} />
      </>
    );
  }

  const data = query.data;

  if (data === undefined || data === null || isEmpty?.(data)) {
    return (
      <>
        {title}
        <Empty emptyText={emptyText} />
      </>
    );
  }

  return (
    <>
      {title}
      {children(data)}
    </>
  );
}
