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
        <span className="absolute -right-[4px] -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {wishList.length}
        </span>
      )}
    </Link>
  )
}

export default WishListIcon
