import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  [key: string]: any
}

const QuillEditor = ({ value, onChange, ...rest }: QuillEditorProps) => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} {...rest} />
}

export default QuillEditor
