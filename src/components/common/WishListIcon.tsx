import Link from 'next/link'
import { useWishListStore } from '@/stores/useWishListStore'

const WishListIcon = () => {
  const wishList = useWishListStore((state: any) => state.wishList)

  return (
    <Link
      href={`/my-courses?tab=wishlist`}
      className="relative flex items-center justify-center"
    >
      <i className="flaticon-heart fs-22" />
      {wishList.length > 0 && (
        <span className="absolute -top-1 right-[-4px] flex size-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {wishList.length}
        </span>
      )}
    </Link>
  )
}

export default WishListIcon
