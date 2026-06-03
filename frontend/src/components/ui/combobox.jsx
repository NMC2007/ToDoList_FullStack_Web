import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Check, ChevronDown } from 'lucide-react'

export const Combobox = ({ items = [], value, onValueChange, children }) => {
  const [open, setOpen] = useState(false)
  const selectedLabel = items.find(item => item.value === value)?.label || 'Chọn lọc'

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open}
          className="w-auto px-4 py-2 h-auto rounded-lg bg-white border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm gap-2 transition-colors"
        >
          {selectedLabel}
          <ChevronDown className={`h-4 w-4 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 rounded-lg shadow-lg border-gray-200">
        <Command>
          <CommandList className="max-h-48">
            <CommandEmpty className="py-6 text-center text-sm text-gray-500">Không có mục nào</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue)
                    setOpen(false)
                  }}
                  className={`px-3 py-2 cursor-pointer transition-colors text-sm ${value === item.value ? 'bg-purple-100' : 'hover:bg-purple-50'}`}
                >
                  <Check className={`mr-2 h-4 w-4 text-purple-500 font-bold ${value === item.value ? 'opacity-100' : 'opacity-0'}`} />
                  <span className={value === item.value ? 'font-semibold text-purple-700' : 'text-gray-700'}>
                    {item.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const ComboboxInput = ({ placeholder }) => {
  return null
}

export const ComboboxContent = ({ children }) => {
  return null
}

export const ComboboxEmpty = ({ children }) => {
  return null
}

export const ComboboxList = ({ children }) => {
  return null
}

export const ComboboxItem = ({ children, value, ...props }) => {
  return null
}
