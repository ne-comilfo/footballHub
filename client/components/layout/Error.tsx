export default function Error({ errorText }: { errorText: string }) {
  return <div className="text-xl flex justify-center">{errorText}</div>;
}
