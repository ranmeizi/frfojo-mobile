'use client'

import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { KeepAliveContext } from './KeepAliveContext'

interface KeepAliveProviderProps {
  children: React.ReactNode
}

// 最大缓存数量
const MAX_CACHE_SIZE = 5

export const KeepAliveProvider: React.FC<KeepAliveProviderProps> = ({ children }) => {
  const pathname = usePathname()
  const [componentList, setComponentList] = useState<Map<string, React.ReactNode>>(new Map())

  // 更新缓存组件列表的方法
  const updateComponentList = (path: string, component: React.ReactNode) => {
    setComponentList((prev) => {
      const newMap = new Map(prev)
      newMap.set(path, component)

      if (newMap.size > MAX_CACHE_SIZE) {
        const oldestKey = newMap.keys().next().value

        if (oldestKey !== undefined) {
          newMap.delete(oldestKey)
        }
      }

      return newMap
    })
  }

  return (
    <KeepAliveContext.Provider
      value={{
        componentList,
        updateComponentList,
        activePath: pathname,
      }}
    >
      {/*
        必须始终挂载 Next 传入的 children（当前 URL 对应的路由树）。
        若用缓存节点替换掉 children，当前路由没有真实页面挂载，router.back / Link 等会异常。
        Map 仍可由 KeepAlive 写入，供后续接 react-activation 等真正保活方案使用。
      */}
      {[...componentList.entries()].map(([key, node]) => (
        <div
          key={key}
          style={{
            display: key === pathname ? 'block' : 'none',
            height: '100%',
          }}
        >
          {node}
        </div>
      ))}
      <div className="h-full">{!componentList.get(pathname) && children}</div>
    </KeepAliveContext.Provider>
  )
}
