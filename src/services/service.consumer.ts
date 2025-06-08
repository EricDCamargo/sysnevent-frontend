import { CookieValueTypes } from 'cookies-next'
import { debug, api } from './api'
import { getCookieClient } from '@/lib/cookieClient'

const { debugError, debugSuccess } = debug
const environment = process.env.NEXT_ENVIRONMENT
interface ResponsePromise {
  [x: string]: any
  data: any | Array<any>
  message: string
  status: number
  isOk: boolean
}

export const serviceConsumer = (
  token?: string | CookieValueTypes | Promise<CookieValueTypes>
) => ({
  //Get Method
  executeGet: async function (url: string, params?: any) {
    return await this.executeService(token, 'GET', url, params)
  },

  //Post Method
  executePost: async function (
    url: string,
    body: FormData | any | Array<any>,
    params?: any
  ) {
    return await this.executeService(token, 'POST', url, params, body)
  },

  //Put Method
  executePut: async function (
    url: string,
    params?: any,
    body?: FormData | any | Array<any>
  ) {
    return await this.executeService(token, 'PUT', url, params, body)
  },

  //Delete
  executeDelete: async function (url: string, params?: any) {
    return await this.executeService(token, 'DELETE', url, params)
  },

  executeService: async function (
    token: string | CookieValueTypes | Promise<CookieValueTypes> | null,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    url: string,
    params?: any,
    data?: FormData | any | Array<any>
  ): Promise<ResponsePromise> {
    const getToken = () => {
      if (token) {
        return token
      } else {
        return getCookieClient()
      }
    }
    let headers: Record<string, string> = {
      Authorization: `Bearer ${getToken()}`
    }
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    let response

    response = api({
      method,
      url,
      params,
      headers,
      data
    })
      .then(res => {
        const { data, status } = res
        const successResponse: ResponsePromise = {
          data: data.data,
          status: status,
          message: data.message,
          isOk: true
        }
        if (environment === 'dev') {
          debugSuccess('-------- DEBUG - SUCCESS - START --------')
          console.log(successResponse)
          debugSuccess('-------- DEBUG - SUCCESS - END --------')
        }
        return successResponse
      })
      .catch(err => {
        const { response, status } = err
        const errorResponse: ResponsePromise = {
          data: [],
          status: status,
          message: response?.data?.error,
          isOk: false
        }
        if (environment === 'dev') {
          debugError('-------- DEBUG - ERROR - START --------')
          console.log(errorResponse)
          debugError('-------- DEBUG - ERROR - END --------')
        }
        return errorResponse
      })

    return response
  }
})
