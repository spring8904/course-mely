import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '@/styles/quill-editor.css'

interface QuillEditorProps {
  value?: string
  onChange?: (value: string) => void
  fullToolbar?: boolean
  className?: string
  [key: string]: any
}

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],

  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],

  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['clean'],
]

const QuillEditor = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
  fullToolbar = false,
  disabled,
  ...rest
}: QuillEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      readOnly={disabled}
      modules={{
        toolbar: disabled ? null : fullToolbar ? toolbarOptions : undefined,
      }}
      {...rest}
    />
  )
}

export default QuillEditor
