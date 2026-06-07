import handleError from '@/Helpers/handleError'
import { axiosInstance } from '@/Service/api'
import { END_POINT } from '@/Service/constant'
import { MemeTemplate } from '@/Type'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

const request = async (): Promise<MemeTemplate[]> => {
  const { data } = await axiosInstance.request({
    method: 'GET',
    url: END_POINT.templates,
  })
  return data || []
}

const useListMeme = () => {
  const [error, setError] = useState<string | null>(null)

  const { isError, data, isFetching, refetch, error: queryError } = useQuery({
    queryKey: ['get-useListMeme'],
    queryFn: () => request(),
    enabled: true,
  })

  useEffect(() => {
    if (queryError) {
      const { message } = handleError(queryError)
      setError(message || 'Something went wrong')
    }
  }, [queryError])

  return { isError, isFetching, data, error, refetch, setError }
}

export { useListMeme }
