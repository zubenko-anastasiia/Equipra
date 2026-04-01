'use client'

import CareerApplicationModal from '@/app/_components/CareerApplicationModal'
import { useState } from 'react'

export default function VacancyApplyButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-[2px] bg-[#171717] px-[10px] py-2 text-sm font-medium leading-5 text-[#fafafa] transition-opacity hover:opacity-80"
      >
        Apply here
      </button>

      <CareerApplicationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
