import handleError from '@/Helpers/handleError'
import { axiosInstance } from '@/Service/api'
import { END_POINT } from '@/Service/constant'
import { useMutation } from '@tanstack/react-query'

export interface CreateImagePayload {
  template_id: string
  text: string[]
  font?: string
}

export interface CreateImageResponse {
  url: string
}

const request = async (payload: CreateImagePayload): Promise<CreateImageResponse> => {
  const { data } = await axiosInstance.request({
    method: 'POST',
    url: END_POINT.images,
    data: payload,
  })
  return data
}

interface UseCreateImageOptions {
  createSuccess?: (data: CreateImageResponse) => void
  onError?: (message: string) => void
}

const useCreateImage = ({ createSuccess, onError }: UseCreateImageOptions = {}) => {
  const mutation = useMutation({
    mutationFn: (payload: CreateImagePayload) => request(payload),
    onSuccess: (data) => {
      createSuccess?.(data)
    },
    onError: (error) => {
      const { message } = handleError(error)
      onError?.(message || 'Something went wrong')
    },
  })

  return mutation
}

export { useCreateImage }
