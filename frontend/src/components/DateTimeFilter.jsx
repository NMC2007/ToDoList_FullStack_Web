import React, { useState } from 'react'
import { Combobox } from "@/components/ui/combobox"
import { options } from '@/lib/data'

const DateTimeFilter = ({ dateQuery = 'all', setDateQuery = () => {} }) => {
  return (
    <Combobox 
      items={options}
      value={dateQuery}
      onValueChange={setDateQuery}
    />
  )
}

export default DateTimeFilter