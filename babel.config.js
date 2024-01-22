module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@Common': './src/Components/Common',
          '@Components': './src/Components',
          '@Utilities': './src/Utilities',
          '@Types': './src/Types',
          '@Screens': './src/Screens',
          '@Routes': './src/Routes',
          '@Resources': './src/Resources',
          '@Redux': './src/Redux',
          '@Assets': './src/Assets',
        },
      },
    ],
  ],
};
