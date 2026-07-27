"use client";

export default function HeroForm({
  data,
}: {
  data: any;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hero</h1>

      <pre className="rounded bg-gray-100 p-4 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}