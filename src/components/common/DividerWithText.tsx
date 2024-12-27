const DividerWithText = ({ text }: { text: string }) => {
  return (
    <div className="flex w-fit items-center space-x-6">
      <hr className="w-5 flex-1 border-[#5D5A6F]" />
      <span className="text-[#5D5A6F]">{text}</span>
      <hr className="w-5 flex-1 border-[#5D5A6F]" />
    </div>
  )
}

export default DividerWithText
