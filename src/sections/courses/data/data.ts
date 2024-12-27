import { CourseStatus, IChapter, ICourse, ILesson } from '@/types'

export const courseData: ICourse = {
  id: 1,
  userId: 1,
  categoryId: 1,
  code: 'COURSE101',
  name: 'Khoá học ReactJS cơ bản cho người mới bắt đầu',
  slug: 'khoa-hoc-reactjs-co-ban-cho-nguoi-moi-bat-dau',
  thumbnail: 'https://picsum.photos/300/200',
  description:
    'Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này.',
  price: 590.0,
  priceSale: 300.0,
  level: 'Intermediate',
  duration: 80,
  totalStudent: 1200,
  benefits: [
    'Hiểu về khái niệm SPA/MPA',
    'Hiểu về khái niệm component, props, state',
    'Biết cách sử dụng ReactJS để tạo ra các ứng dụng ',
    'Hiểu về cách React hoạt động',
    'Biết cách tối ưu ứng dụng',
    'Hiểu rõ ràng Redux workflow',
    'Triển khai dự án React ra Internet',
    'Biết cách sử dụng Firebase để lưu trữ dữ liệu',
    'Biết cách Deploy lên Github',
    'Biết cách sử dụng React Hook',
    'Thành thạo làm việc với RESTfull API',
    'Biết cách sử dụng React Router',
  ],
  requirements: [
    'Yêu cầu có Laptop',
    'Hiểu rõ kiến thức về mô hình Clien-Server',
    'Phân biệt rõ ràng giữa Backend và Frontend',
    'Có kiến thức cơ bản về HTML, CSS, JS',
    'Có tinh thần học tập tốt',
    'Có kiến thức cơ bản về NodeJS',
  ],
  qa: [
    {
      question: 'Khóa học này dành cho ai?',
      answer:
        'Khóa học này dành cho những bạn muốn học ReactJS từ cơ bản tới nâng cao, không yêu cầu kiến thức nền tảng về ReactJS.',
    },
    {
      question: 'Sau khi học xong khóa học này, mình có thể làm được gì?',
      answer:
        'Sau khi học xong khóa học này, bạn có thể xây dựng một ứng dụng web hoàn chỉnh với ReactJS, bạn có thể tự tin đi xin việc với ReactJS.',
    },
    {
      question: 'Mình không biết gì về ReactJS, có thể học được không?',
      answer:
        'Có thể, khóa học này được thiết kế dành cho những bạn không biết gì về ReactJS, bạn sẽ được hướng dẫn từ cơ bản tới nâng cao.',
    },
    {
      question: 'Khoá học này có sử dụng TypeScript không?',
      answer: 'Có, khóa học này sử dụng TypeScript để viết code.',
    },
  ],
  status: CourseStatus.Approved,
  accepted: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  createdAt: new Date('2023-12-01T09:00:00Z'),
  updatedAt: new Date('2023-12-15T08:00:00Z'),
}

export const chapterData: IChapter[] = [
  {
    id: 1,
    courseId: 1,
    title: 'ReactJS cơ bản',
    order: 1,
  },
  {
    id: 2,
    courseId: 1,
    title: 'Ôn lại kiến thức về ES6+',
    order: 2,
  },
  {
    id: 3,
    courseId: 1,
    title: 'JSX, Props, State',
    order: 3,
  },
  {
    id: 4,
    courseId: 1,
    title: 'React Hook',
    order: 4,
  },
  {
    id: 5,
    courseId: 1,
    title: 'Redux',
    order: 5,
  },
]

export const lessonData: ILesson[] = [
  {
    id: 1,
    chapterId: 1,
    title: 'ReactJS cơ bản',
    content: 'ReactJS cơ bản',
    order: 1,
  },
  {
    id: 2,
    chapterId: 1,
    title: 'Ôn lại kiến thức về ES6+',
    content: 'Ôn lại kiến thức về ES6+',
    order: 2,
  },
]
