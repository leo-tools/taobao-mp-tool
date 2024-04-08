import { makeRequest } from './index'

export const getSession = () =>
  makeRequest({
    // TODO 修改 path
    path: '/config/getSession?app=main',
    method: 'get',
  })
