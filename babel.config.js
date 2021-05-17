module.exports = (api) => {
  const prodMode = api.env('production')

  return {
    presets: [
      '@babel/preset-env',
      [
        'minify',
        prodMode && {
          removeConsole: {
            exclude: ['error', 'info'],
          },
        },
      ].filter(Boolean),
    ],
  }
}
