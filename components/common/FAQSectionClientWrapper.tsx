"use client"

import { Suspense } from "react"
import FAQSectionSSR from "./FAQSectionSSR"
import FAQSectionSkeleton from "./FAQSectionSkeleton"

interface Props {
  cityId: number
  title?: string
}

export function FAQSectionClient({ cityId, title }: Props) {
  return (
    <Suspense fallback={<FAQSectionSkeleton title={title} />}>
      <FAQSectionSSR cityId={cityId} title={title} />
    </Suspense>
  )
}