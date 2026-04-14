'use client'

import { usePathname } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { KeepAliveContext } from './KeepAliveContext'

export const KeepAlive = ({ children }: { children: React.ReactNode }) => {
  const { updateComponentList } = useContext(KeepAliveContext)
  const pathname = usePathname()

  // 每当 children 变化时，更新缓存的组件列表
  useEffect(() => {
    updateComponentList(pathname, children)
  }, [children])

  // 该组件本身不渲染任何内容
  return null
}