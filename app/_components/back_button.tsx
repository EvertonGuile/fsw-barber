"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { ChevronLeftIcon } from "lucide-react"

export default function BackButton() {

  const router = useRouter()

  function handleBack() {

    const referrer = document.referrer

    const isInternal =
      referrer &&
      new URL(referrer).origin === window.location.origin

    if (isInternal) {
      router.back()
    } else {
      router.push("/")
    }

  }

  return (
    <Button
      size="icon"
      variant="secondary"
      className="absolute top-4 left-4"
      onClick={handleBack}
    >
      <ChevronLeftIcon />
    </Button>
  )

}
