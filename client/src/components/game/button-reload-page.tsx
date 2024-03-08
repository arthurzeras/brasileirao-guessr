"use client";

export default function ButtonReloadPage() {
  return (
    <button
      className="text-center shadow-md rounded-md py-1 mt-2 px-4 border bg-slate-300 border-slate-500"
      onClick={() => window.location.reload()}
    >
      Recarregar
    </button>
  );
}
