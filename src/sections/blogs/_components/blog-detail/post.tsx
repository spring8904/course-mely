import React from 'react'
import Image from 'next/image'

interface BlogDetailPostProps {
  initialBlogDetail: any
}

const BlogDetailPost = ({ initialBlogDetail }: BlogDetailPostProps) => {
  return (
    <div className="blog-single-content">
      <div className="meta wow fadeInUp">
        <div className="meta-item">
          <i className="flaticon-calendar"></i>
          <p>{initialBlogDetail.published_at}</p>
        </div>
        <div className="meta-item">
          <i className="flaticon-message"></i>
          <p>14</p>
        </div>
        <a href="#" className="meta-item">
          <i className="flaticon-user-1"></i>
          <p>{initialBlogDetail.user.name}</p>
        </a>
      </div>
      <h2 className="fw-7 wow fadeInUp">{initialBlogDetail.title}</h2>
      <div className="title text-22 fw-5 wow fadeInUp">About This Course</div>
      <p className="fs-15">
        <div
          dangerouslySetInnerHTML={{ __html: initialBlogDetail?.description }}
        />
      </p>
      <p className="fs-15 mt-3">
        <div dangerouslySetInnerHTML={{ __html: initialBlogDetail?.content }} />
      </p>
      <div className="blockquote">
        <div className="desc fs-15">
          Professional Web Developer Lorem ipsum dolor sit amet. Qui incidunt
          dolores non similique ducimus et debitis molestiae. Et autem quia eum
          reprehenderit voluptates est reprehenderit illo est enim perferendis
          est neque sunt.
        </div>
        <div className="name">{initialBlogDetail.user.name}</div>
      </div>
      <div className="title text-22 fw-5 wow fadeInUp">What you ll learn</div>
      <ul className="wrap-list-text-check">
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">Prepare for Industry Certification Exam</div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">
            Earn Certification that is Proof of your Competence
          </div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">Hours and Hours of Video Instruction</div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">
            Dozens of Code Examples to Download and Study
          </div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">Over 25 Engaging Lab Exercises</div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">All Lab Solutions</div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">
            Instructor Available by Email or on the Forums
          </div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">All Free Tools</div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">Comprehensive Coverage of HTML and CSS</div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">Client Side Programming with Javascript</div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">Server Side Development with PHP</div>
        </li>
        <li className="list-text-item flex items-center gap-[10px]">
          <div className="icon">
            <i className="flaticon-check"></i>
          </div>
          <div className="fs-15">Learn Database Development with mySQL</div>
        </li>
      </ul>
      <div className="image-wrap">
        <div className="image-item wow fadeInLeft">
          <Image
            className="lazyload"
            data-src="/assets/images/blog/blog-12.jpg"
            src="/assets/images/blog/blog-12.jpg"
            alt=""
          />
          <div>Donec purus posuere nullam lacus aliquam.</div>
        </div>
        <div className="image-item wow fadeInRight" data-wow-delay="0.1s">
          <img
            className="lazyload"
            data-src="/assets/images/blog/blog-07.jpg"
            src="/assets/images/blog/blog-07.jpg"
            alt=""
          />
          <div>Donec purus posuere nullam lacus aliquam.</div>
        </div>
      </div>
      <div className="title text-22 fw-5 wow fadeInUp">Requirements</div>
      <ul className="wrap-list-text-dot">
        <li className="list-text-item fs-15">
          There are no skill course although its helpful if you are familiar
          with operating your computer and using the internet.
        </li>
        <li className="list-text-item fs-15">
          You can take this course using a Mac, PC or LInux machine.
        </li>
        <li className="list-text-item fs-15">
          It is recommended that you download the free Komodo text editor.
        </li>
      </ul>
    </div>
  )
}

export default BlogDetailPost
