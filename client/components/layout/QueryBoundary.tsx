import Empty from "./Empty";
import Error from "./Error";
import Loading from "./Loading";

interface QueryBoundaryProps<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null | undefined;
  Title?: React.ReactNode;
  loadingText: string;
  errorText: string;
  emptyText: string;
}

export default function QueryBoundary<T>({
  isLoading,
  error,
  data,
  Title,
  loadingText,
  errorText,
  emptyText,
}: QueryBoundaryProps<T>) {
  if (isLoading)
    return (
      <>
        {Title}
        <Loading loadingText={loadingText} />
      </>
    );
  if (error)
    return (
      <>
        {Title}
        <Error errorText={errorText} />
      </>
    );
  if (!data)
    return (
      <>
        {Title}
        <Empty emptyText={emptyText} />
      </>
    );
}
