interface Props {
  title?: string
}

export default function FAQSectionSkeleton({ title = "Frequently Asked Questions" }: Props) {
  return (
    <section className="py-16 bg-white rounded-2xl border border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center md:mb-12 mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-96 bg-gray-100 rounded mx-auto animate-pulse" />
        </div>

        <div className="space-y-4 px-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}