import { cn } from '@/lib/utils'

const HtmlRenderer = ({
  html,
  className,
}: {
  html: string | TrustedHTML
  className?: string
}) => {
  return (
    <div
      className={cn('prose', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
export default HtmlRenderer
