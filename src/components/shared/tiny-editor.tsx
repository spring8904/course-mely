'use client'

import { Editor } from '@tinymce/tinymce-react'

const configEditor = {
  plugins:
    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
  toolbar:
    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
  min_height: 300,
  menubar: true,
  branding: false,
  statusbar: true,
  resize: true,
}

type Props = {
  init?: any
  value?: string
  onEditorChange?: (a: string, editor: any) => void
}

const TinyEditor = ({ init, value, onEditorChange, ...rest }: Props) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      init={{ ...configEditor, ...init }}
      value={value}
      onEditorChange={onEditorChange}
      {...rest}
    />
  )
}
export default TinyEditor
