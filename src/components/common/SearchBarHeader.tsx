import { Search } from 'lucide-react'

const SearchBarHeader = () => (
  <div className="w-96 rounded-lg border px-4 py-3">
    <form className="flex items-center space-x-2">
      <Search color="#98A2B3" size={20} />
      <input
        type="text"
        placeholder="Tìm kiếm khoá học, bài viết,..."
        className="flex-1 outline-none"
      />
    </form>
  </div>
)

export default SearchBarHeader
