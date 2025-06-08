import AppPage from '@/components/AppPage'
import { Table, TableColumnProps, Upload, UploadProps } from 'antd'
// import { InboxOutlined } from '@ant-design/icons'
import { uploadToMemory, uploadToDB, IFile, getFiles } from '@/api/upload'

import { useAsyncFn } from 'react-use'
import { useEffect } from 'react'

const UploadPage = () => {
  const customRequest: UploadProps['customRequest'] = async (params) => {
    const { file, onSuccess, onError } = params
    const res = await uploadToDB(file as File)
  }

  const [getState, doGet] = useAsyncFn(async () => {
    const result = await getFiles()
    return result?.data?.data
  })

  useEffect(() => {
    doGet()
  }, [])

  const columns: TableColumnProps<IFile>[] = [
    {
      title: 'file',
      dataIndex: 'file',
      key: 'file',
      render: (_, row) => {
        const { file, url, type } = row
        if (file && type) {
          const src = `data:${type};base64,${file}`
          return <img className="w-20 h-20 rounded-6" src={src} />
        }

        if (url) {
          return <img src={url} />
        }
        return '-'
      },
    },
    {
      title: 'fileName',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: 'fileFor',
      dataIndex: 'fileFor',
      key: 'fileFor',
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '上传时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]
  return (
    <AppPage>
      <Upload.Dragger customRequest={customRequest}>
        <div className="ant-upload-drag-icon">
          <p>Click or drag file to this area to upload</p>
          <p className="ant-upload-text">Or click upload button</p>
        </div>
      </Upload.Dragger>

      <Table
        columns={columns}
        loading={getState.loading}
        dataSource={getState.value || []}
      />
    </AppPage>
  )
}

export default UploadPage
