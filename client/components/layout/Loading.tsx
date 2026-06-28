export default function Loading({ loadingText }: { loadingText: string }) {
  return <div className="text-xl flex justify-center">{loadingText}</div>;
}
