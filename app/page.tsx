import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center gap-6 max-w-lg">
        <h1 className="text-4xl font-bold">Performance Analytics Dashboard</h1>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Demo dashboard for visualizing entity metrics and historical
          performance data.
        </p>

        <Link
          href="/dashboard"
          className="px-6 py-3 bg-black text-white rounded-md hover:opacity-80 transition"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}
