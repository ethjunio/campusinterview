export default function DashboardSkeleton() {
  return (
    <main className="bg-light-softer space-y-6 flex-grow relative p-16">
      <section className="space-y-2">
        <div className="h-6 bg-gray-200 rounded-md w-48 animate-pulse" />
      </section>

      <section className="space-y-2">
        <div className="h-6 bg-gray-200 rounded-md w-32 animate-pulse mb-2" />
        <div className="h-24 bg-gray-200 rounded-lg w-48 animate-pulse" />
      </section>

      <section className="space-y-2">
        <div className="h-6 bg-gray-200 rounded-md w-40 animate-pulse mb-2" />
        <div className="flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-lg w-48 animate-pulse"
            />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="h-6 bg-gray-200 rounded-md w-36 animate-pulse mb-2" />
        <div className="h-24 bg-gray-200 rounded-lg w-48 animate-pulse" />
      </section>

      <section className="space-y-2">
        <div className="h-6 bg-gray-200 rounded-md w-32 animate-pulse mb-2" />
        <div className="flex space-x-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-lg w-48 animate-pulse"
            />
          ))}
        </div>
      </section>

      {[...Array(4)].map((_, i) => (
        <section key={i} className="space-y-2">
          <div className="h-6 bg-gray-200 rounded-md w-40 animate-pulse mb-2" />
          <div className="flex space-x-4">
            <div className="h-24 bg-gray-200 rounded-lg w-48 animate-pulse" />
          </div>
        </section>
      ))}
    </main>
  );
}
