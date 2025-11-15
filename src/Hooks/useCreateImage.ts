import handleError from '@/Helpers/handleError'
import { axiosInstance } from '@/Service/api'
import { END_POINT } from '@/Service/constant'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

const request = async (payload: any) => {
  const { data } = await axiosInstance.request({
    method: 'POST',
    url: END_POINT.images,
    data: {
      ...payload,
    },
  })
  return data || []
}

const useCreateImage = (payload: any, createSuccess: any) => {
  const [error, setError] = useState<string | null>(null)

  const { isError, data, isFetching, refetch, error: queryError } = useQuery({
    queryKey: ['post-useCreateImage'],
    queryFn: () => request(payload),
    enabled: false,
  })

  useEffect(() => {
    if (data && !isFetching) {
      createSuccess?.(data)
    }
  }, [data, isFetching, createSuccess])

  useEffect(() => {
    if (queryError) {
      const { message } = handleError(queryError)
      setError(message || 'Something went wrong')
    }
  }, [queryError])

  return { isError, isFetching, data, error, refetch, setError }
}

export { useCreateImage }
