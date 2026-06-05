/**
 * Unit tests for the API error normaliser in src/Helpers/handleError.
 *
 * @format
 */
import { AxiosError } from 'axios'
import handleError from '@/Helpers/handleError'

describe('handleError', () => {
  it('extracts status code and detail from an axios error response', () => {
    const error = new AxiosError('Request failed')
    // @ts-expect-error - partial response shape is enough for the helper
    error.response = {
      status: 404,
      statusText: 'Not Found',
      data: { data: { detail: 'Template not found' } },
    }

    const result = handleError(error)

    expect(result.code).toBe(404)
    expect(result.message).toBe('Template not found')
  })

  it('falls back to the response message when no detail is present', () => {
    const error = new AxiosError('Request failed')
    // @ts-expect-error - partial response shape is enough for the helper
    error.response = {
      status: 500,
      statusText: 'Server Error',
      data: { message: 'Something broke' },
    }

    const result = handleError(error)

    expect(result.code).toBe(500)
    expect(result.message).toBe('Something broke')
  })

  it('stringifies non-axios errors', () => {
    const result = handleError(new Error('boom'))

    expect(result.code).toBeUndefined()
    expect(result.message).toContain('boom')
  })
})
