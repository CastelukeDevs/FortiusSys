import createSliceWithThunks from '@Redux/createSliceWithThunks';

export type IDefaultState = {};

export const defaultInitialState: IDefaultState = {};

const DefaultReducer = createSliceWithThunks({
  name: 'default',
  initialState: defaultInitialState,
  reducers: {},
});

export const {} = DefaultReducer.actions;
export default DefaultReducer.reducer;
