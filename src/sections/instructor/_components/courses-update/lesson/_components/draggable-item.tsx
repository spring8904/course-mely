'use client'

import React, { createContext, CSSProperties, useMemo } from 'react'
import { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface DraggableLessonProps {
  id?: UniqueIdentifier
  children: React.ReactNode
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners

  ref(node: HTMLElement | null): void
}

export const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

const DraggableItem = ({ id, children }: DraggableLessonProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: id as UniqueIdentifier })

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  )

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <div className="SortableItem" ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  )
}

export default DraggableItem
