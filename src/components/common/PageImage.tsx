import Image from 'next/image'

type Props = {
  src: string
  alt: string
  author: string
  subAuthor: string
}

const PageImage = ({ src, alt, author, subAuthor }: Props) => (
  <div className="img-left wow fadeInLeft" data-wow-delay="0s">
    <Image src={src} alt={alt} className="ls-is-cached lazyloaded" fill />
    <div className="blockquite wow fadeInLeft" data-wow-delay="0.1s">
      <p>
        Happiness prosperous impression had conviction For every delay <br /> in
        they
      </p>
      <p className="author">{author}</p>
      <p className="sub-author">{subAuthor}</p>
    </div>
  </div>
)

export default PageImage
