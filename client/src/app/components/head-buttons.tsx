import Link from "next/link";
import HeartIcon from "./icons/heart";
import InformationCircle from "./icons/information-circle";
import QuestionMarkCircle from "./icons/question-mark-circle";

export default function HeadButtons() {
  return (
    <header className="absolute flex gap-2 right-2 top-2 md:right-0 md:top-4">
      <Link href="/support-me" className="hover:opacity-35">
        <HeartIcon className="h-7 w-7" />
      </Link>

      <Link href="/info" className="hover:opacity-35">
        <InformationCircle className="h-7 w-7" />
      </Link>

      <Link href="/help" className="hover:opacity-35">
        <QuestionMarkCircle className="h-7 w-7" />
      </Link>
    </header>
  );
}
