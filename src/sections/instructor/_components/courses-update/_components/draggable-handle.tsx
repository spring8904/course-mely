import React, { useContext } from 'react'
import { GripVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SortableItemContext } from '@/sections/instructor/_components/courses-update/lesson/_components/draggable-item'

const DraggableHandle = () => {
  const { attributes, listeners, ref, disabled } =
    useContext(SortableItemContext)

  return (
    <Button
      variant="ghost"
      className="flex size-8 items-center justify-center p-0"
      disabled={disabled}
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <GripVertical />
    </Button>
  )
}

export default DraggableHandle
