import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'

type Props = {
  avatar: string
  name: string
  code: string
  avgRating: string
  bio?: string[]
}

export const UserProfile = ({ name, avatar, bio, code, avgRating }: Props) => (
  <div className="flex flex-col space-y-4">
    <div className="relative mx-auto size-56">
      <Image
        src={avatar}
        alt={name}
        fill
        className="mx-auto rounded-full object-cover"
      />
    </div>

    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="flex items-center space-x-1">
          <Star size={20} />
          <strong>{avgRating}</strong>
        </p>
      </div>
      <Link href={`/profile/${code}`} className="text-base opacity-70">
        @{code}
      </Link>
    </div>

    <ul>
      {bio &&
        bio?.length > 0 &&
        bio?.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
)
