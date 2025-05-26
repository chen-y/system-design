import AppPage from '@/components/AppPage'
import { Upload } from 'antd'
// import { InboxOutlined } from '@ant-design/icons'
import { uploadToMemory } from '@/api/upload'

const UploadPage = () => {
  return (
    <AppPage>
      <Upload.Dragger action="/api/upload/memory">
        <p className="ant-upload-drag-icon">
          <p>Click or drag file to this area to upload</p>
          <p className="ant-upload-text">Or click upload button</p>
        </p>
      </Upload.Dragger>
    </AppPage>
  )
}

export default UploadPage
