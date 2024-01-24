import createSliceWithThunks from '@Redux/createSliceWithThunks';
import {IDefaultFetchState} from '@Types/FetchTypes';
import {ICompanyData, IEmpolyeeData, IUser, IUserFetch} from '@Types/UserTypes';
import APICall from '@Utilities/APIs/APICall';
import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {toast} from '@backpackapp-io/react-native-toast';

export type IUserState = {
  user: IUser | null;
  company: ICompanyData | null;
  employee: IEmpolyeeData | null;
  token: string | null;
} & IDefaultFetchState;

export const userInitialState: IUserState = {
  status: 'idle',
  error: null,
  user: null,
  company: null,
  employee: null,
  token: null,
};

const UserReducer = createSliceWithThunks({
  name: 'user',
  initialState: userInitialState,
  selectors: {
    isUserReady: state => state.status === 'idle',
    selectUserStatus: state => state.status,
    selectUser: state => state.user,
    selectUserEmployee: state => state.employee,
    selectUserCompany: state => state.company,
    selectUserToken: state => state.token,
  },
  reducers: create => ({
    resetUserState: create.reducer(() => ({...userInitialState})),
    getUserData: create.asyncThunk<
      {email: string; password: string} & ICancelSignal,
      IUserFetch
    >(
      async props => {
        const call = await APICall('AUTH_LOGIN', {
          abortController: props?.abortController,
          data: {email: props.email, password: props.password},
        });
        return call.data as IUserFetch;
      },
      {
        pending: state => {
          state.status = 'fetching';
          state.error = null;
        },
        rejected: (state, action) => {
          toast.error('Email or password invalid');
          state.status = 'error';
          state.error = {message: action.error.message!, error: action.error};
        },
        fulfilled: (state, action) => {
          toast.success('Sign in Success');
          state.status = 'idle';
          state.error = null;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.employee = action.payload.user.employee;
          state.company = action.payload.user.company;
        },
      },
    ),
  }),
});

export const {
  isUserReady,
  selectUserStatus,
  selectUser,
  selectUserEmployee,
  selectUserCompany,
  selectUserToken,
} = UserReducer.selectors;
export const {resetUserState, getUserData} = UserReducer.actions;
export default UserReducer.reducer;
