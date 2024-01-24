import createSliceWithThunks from '@Redux/createSliceWithThunks';

export type IDefaultState = {
  statusBar: 'dark-content' | 'light-content';
};

export const defaultInitialState: IDefaultState = {
  statusBar: 'dark-content',
};

const DefaultReducer = createSliceWithThunks({
  name: 'default',
  initialState: defaultInitialState,
  selectors: {selectStatusBar: state => state.statusBar},
  reducers: create => ({
    statusBarLight: create.reducer(state => {
      state.statusBar = 'light-content';
    }),
    statusBarDark: create.reducer(state => {
      state.statusBar = 'dark-content';
    }),
  }),
});

export const {selectStatusBar} = DefaultReducer.selectors;
export const {statusBarLight, statusBarDark} = DefaultReducer.actions;
export default DefaultReducer.reducer;
