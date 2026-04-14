// 创建context
import React, { createContext } from 'react'

interface IKeepAliveContext {
  // 缓存的组件列表
  componentList: Map<string, React.ReactNode>
  // 更新缓存组件列表的方法
  updateComponentList: (path: string, component: React.ReactNode) => void
  // 当前激活的路径
  activePath?: string
}

export const KeepAliveContext = createContext<IKeepAliveContext>({
  componentList: new Map<string, React.ReactNode>(),
  updateComponentList: () => {},
})