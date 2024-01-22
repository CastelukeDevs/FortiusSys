export type IFetchProgress = 'idle' | 'fetching' | 'error';

export type IErrorMessage = {
  message: string | null;
  error: any;
};

export type IDefaultFetchState = {
  error: IErrorMessage | null;
  status: IFetchProgress;
};
