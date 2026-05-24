import React from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const AddTask = () => {
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className='flex flex-col gap-3 sm:flex-row'>
            <Input 
                type="Text"
                placeholder="Việc cần làm là..."
                className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 focus:ring-primary/50"
            />

            <Button variant="gradient" size="xl" className="px-6 items-center justify-between">
                <Plus className='size-5'/>
                Thêm
            </Button>
        </div>
    </Card>
  )
}

export default AddTask