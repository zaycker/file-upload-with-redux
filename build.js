import webpack from 'webpack';

webpack(require('./webpack.config').default, function(err, stats) {
  if (err) {
    console.error('[webpack:build]', err);
    return;
  }
  console.log('[webpack:build]', stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true
  }));
});
