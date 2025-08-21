export interface PostData {
  title: string
  description: string
  date: string
  published: boolean
  tags: string[]
  toc?: any[]
  body?: any
}

export interface Page<T = PostData> {
  url: string
  data: T
}
