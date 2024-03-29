import { makeRequest } from './index'

export const getSession = () =>
  makeRequest({
    path: '/config/getSession?app=main',
    method: 'get',
  })
