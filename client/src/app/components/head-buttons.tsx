import Link from "next/link";
import QuestionMarkCircle from "./icons/question-mark-circle";

export default function HeadButtons() {
  return (
    <header className="absolute right-2 top-2 md:right-0 md:top-4">
      <Link href="/help" className="hover:opacity-35">
        <QuestionMarkCircle className="h-7 w-7" />
      </Link>
    </header>
  );
}
