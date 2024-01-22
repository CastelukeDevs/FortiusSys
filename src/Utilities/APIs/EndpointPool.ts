import {IEndpointPool} from './APIUtils';

/**
 * This endpoint pool types accepts
 * @type IEndpointPool
 */

export const BASE_URL = 'https://dev-api.fortiusys.com/api';

const EndpointPool = [
  {
    endpoint: 'AUTH_LOGIN',
    url: '/login',
    method: 'post',
    auth: false,
  },
] as const satisfies IEndpointPool[];

export default EndpointPool;
