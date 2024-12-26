export enum PostStatus {
  Draft = 'draft',
  Pending = 'pending',
  Publish = 'publish',
  Private = 'private',
}

export interface IPost {
  id?: number
  userId?: number
  categoryId?: number
  title: string
  slug?: string
  description?: string
  content?: string
  thumbnail?: string
  status: PostStatus
  view?: number
  isHot?: 0 | 1
  publishedAt?: Date | null
  deletedAt?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ILikePost {
  id?: number
  userId?: number
  postId?: number
  likeType?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}
