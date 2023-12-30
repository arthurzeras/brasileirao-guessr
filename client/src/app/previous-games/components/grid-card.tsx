import Link from "next/link";

export default function GridCard({ number }: { number: number }) {
  return (
    <Link
      href={`/previous-games/${number}`}
      className="bg-slate-400 text-center py-4 rounded-md hover:bg-slate-300 border border-slate-500"
    >
      {number}
    </Link>
  );
}
