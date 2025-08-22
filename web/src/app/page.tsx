export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Lintric
      </h1>
      <p className="text-gray-600 text-center max-w-md">
        AI-powered PR and code health assistant.
        <br />
        Lint smarter, measure deeper.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          Get Started
        </a>
        <a
          href="/docs"
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
        >
          Docs
        </a>
      </div>
    </main>
  );
}
