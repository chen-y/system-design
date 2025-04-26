import { useEffect } from 'react'
import { useLoaderData } from 'react-router'
import request from '@/api/utils'

export async function loader() {
  return Promise.resolve(123123)
}

const Home = () => {
  const data = useLoaderData()

  // throw new Error('123123')

  useEffect(() => {
    console.log('123123')
  }, [])

  return (
    <div>
      <div>home</div>
      <div>{data}</div>
    </div>
  )
}

export default Home
