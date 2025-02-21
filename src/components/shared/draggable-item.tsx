'use client'

import React, { createContext, CSSProperties, useMemo } from 'react'
import { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface DraggableProps {
  id?: UniqueIdentifier
  children: React.ReactNode
  disabled?: boolean
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  disabled?: boolean
  ref(node: HTMLElement | null): void
}

export const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  disabled: false,
  ref() {},
})

const DraggableItem = ({ id, children, disabled }: DraggableProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: id as UniqueIdentifier, disabled })

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      disabled,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, disabled, setActivatorNodeRef]
  )

  const style: CSSProperties = {
    opacity: isDragging || disabled ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  )
}

export default DraggableItem
