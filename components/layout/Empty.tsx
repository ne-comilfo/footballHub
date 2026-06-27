export default function Empty({ emptyText }: { emptyText: string }) {
  return <div className="text-xl flex justify-center">{emptyText}</div>;
}
