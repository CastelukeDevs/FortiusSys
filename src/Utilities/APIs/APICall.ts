import axios, {AxiosError, AxiosResponse} from 'axios';
import {
  IAPIResult,
  IAPIsCallOption,
  IEndpoint,
  TransformObjectToForm,
  getEndpoint,
} from './APIUtils';
import {retrieveToken} from '@Utilities/Tools/AsyncStorageUtils';

const APICall = async (endpoint: IEndpoint, options?: IAPIsCallOption) => {
  const selectEndpoint = getEndpoint(endpoint)!;
  const token = await retrieveToken();

  const authHeader = selectEndpoint.auth
    ? {Authorization: `Bearer ${token}`}
    : {};

  const requestHeader = {
    ...authHeader,
    'Content-Type': 'application/json',
  };

  const dataPayload = options?.data;

  console.log(`=> New API Call ${endpoint} with detail:`, {
    options,
    payloadData: dataPayload,
    requestHeader: requestHeader,
  });

  return await axios({
    method: selectEndpoint.method,
    url: selectEndpoint.url,
    data: dataPayload,
    params: options?.params,
    signal: options?.abortController?.signal,
    headers: requestHeader,
  })
    .then((result: AxiosResponse<IAPIResult>) => {
      console.log(`=> [O] AXIOS request ${endpoint} success`, result);

      return result.data;
    })
    .catch((error: AxiosError<IAPIResult>) => {
      const errorPayload = {
        message: error.response?.data?.message || error.message,
        code: `${error.response?.data.status}`,
        status: error.response?.data.status,
        response: error.response?.data || error.response,
      };
      console.log(
        `=> [X] AXIOS ${endpoint} code: ${errorPayload.code} msg: ${errorPayload.message}`,
      );
      console.log('=> [X] AXIOS error:', error);

      throw errorPayload;
    });
};

export default APICall;
