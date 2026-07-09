"use client"

import FAQSection from "./FAQSection"

interface Props {
  cityId: number
  title?: string
}

export function FAQSectionClient({ cityId, title }: Props) {
  return (
    <FAQSection cityId={cityId} title={title} />
  )
}