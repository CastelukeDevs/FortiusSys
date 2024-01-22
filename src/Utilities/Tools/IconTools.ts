enum IconMode {
  outline,
  filled,
  sharp,
}

export type IIconMode = keyof typeof IconMode;
export type IIconName = keyof typeof IconList;

export const getIconName = (name: IIconName, mode?: IIconMode): string => {
  const selectedMode = mode || 'outline';
  return name + (selectedMode === 'filled' ? '' : `-${selectedMode}`);
};

enum IconList {
  'home',
  'at',
  'eye',
  'eye-off',
  'lock-closed',
  'lock-open',
  'cash',
  'card',
  'desktop',
  'rocket',
  'person',
  'checkmark',
  'close',
  'arrow-back',
  'logo-usd',
  'pencil',
}
