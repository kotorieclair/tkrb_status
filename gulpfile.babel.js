import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import nib from 'nib';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import cheerio from 'cheerio-httpcli';
const $ = plugins();

const production = $.util.env.production || false;

const srcDir = 'src';
const buildDir = 'build';
const dataUrls = {
  initial: 'http://wikiwiki.jp/toulove/?%C5%E1%B7%F5%C3%CB%BB%CE%B0%EC%CD%F7%2F%A5%C6%A1%BC%A5%D6%A5%EB',
  rankupMax: 'http://wikiwiki.jp/toulove/?%C6%C3%20%BA%C7%C2%E7%C3%CD%B0%EC%CD%F7%2F%A5%C6%A1%BC%A5%D6%A5%EB',
};

const config = {
  stylus: {
    entry: `./${srcDir}/styles/style.styl`,
    watch: `./${srcDir}/styles/**/*.styl`,
  },
  webpack: {
    entry: ['./src/index.js'],
    output: {
      filename: 'script.js',
      path: path.resolve(__dirname, buildDir),
      publicPath: buildDir,
    },
    module: {
      loaders: [
        {
          test: /\.json$/,
          // exclude: /node_modules/,
          loader: 'json',
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: { presets: ['react', 'es2015', 'stage-1'] },
        },
        {
          test: /\.md$/,
          exclude: /node_modules/,
          loader: 'babel!html-jsx-loader!markdown',
        },
      ],
    },
    resolve: {
      modulesDirectories: ['node_modules', 'src'],
      extensions: ['', '.js', '.json', '.jsx'],
    },
    plugins: [],
    externals: {
      react: 'React',
      'react-addons-css-transition-group': 'React',
      'react-dom': 'ReactDOM',
    },
  },
  moveIndex: {
    entry: `./${srcDir}/index.html`,
  },
  moveMd: {
    entry: `./${srcDir}/data/help.md`,
    out: 'README.md',
  },
  fetchData: {
    out: `./${srcDir}/data/status.json`,
  },
  deploy: {
    entry: `./${buildDir}/**/!(*.map)`,
  },
};


gulp.task('stylus', () =>  {
  return gulp.src(config.stylus.entry)
    .pipe($.plumber())
    .pipe($.stylus({
      use: nib(),
      import: 'nib',
      compress: production,
    }))
    .pipe(gulp.dest(`./${buildDir}`));
});

gulp.task('webpack', (callback) => {
  webpack({
    ...config.webpack,
    plugins: config.webpack.plugins.concat(production ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ] : []),
  }, (err, stats) => {
    if (err) throw new $.util.PluginError('webpack', err);
    $.util.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('webpack-server', (callback) => {
  const devConfig = {
    ...config.webpack,
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/dev-server',
      ...config.webpack.entry,
    ],
    plugins: [
      ...config.webpack.plugins,
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'eval',
  };

  const compiler = webpack(devConfig);
  new WebpackDevServer(compiler, {
    contentBase: `./${buildDir}/`,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    debug: true,
  }).listen(3000, 'localhost', (err) => {
    if (err) throw new $.util.PluginError('webpack-dev-server', err);
    // Server listening
    $.util.log('[webpack-dev-server]', 'http://localhost:3000');

    // keep the server alive or continue?
    callback();
  });
});

gulp.task('moveIndex', () =>  {
  return gulp.src(config.moveIndex.entry)
    .pipe(gulp.dest(`./${buildDir}`));
});

gulp.task('moveMd', () =>  {
  return gulp.src(config.moveMd.entry)
    .pipe($.rename(config.moveMd.out))
    .pipe(gulp.dest(`./${buildDir}`));
});

gulp.task('fetchData', () =>  {
  let status = [];

  cheerio.fetch(dataUrls.rankupMax)
  .then((result) => {
    result.$('.style_table tbody tr').each((index, row) =>  {
      const $td = result.$(row).children('td');
      const id = $td.eq(0).text();

      if (!id) {
        return false;
      }

      const tmp = {
        id: parseInt(id, 10),
        name: $td.eq(16).children().text(),
        url1: $td.eq(16).children().attr('href'),
        url2: $td.eq(2).children().attr('href'),
        rare: parseInt($td.eq(1).text(), 10),
        type: $td.eq(3).text(),
        family: $td.eq(4).text(),
        slot: parseInt($td.eq(14).text(), 10),
        rankup: parseInt($td.eq(15).text(), 10),
        wideness: $td.eq(10).text(),
        initial: {},
        rankupMax: {
          life: parseInt($td.eq(5).text(), 10),
          attack: parseInt($td.eq(6).text(), 10),
          defence: parseInt($td.eq(7).text(), 10),
          speed: parseInt($td.eq(8).text(), 10),
          push: parseInt($td.eq(9).text(), 10),
          critical: parseInt($td.eq(11).text(), 10),
          search: parseInt($td.eq(12).text(), 10),
          hide: parseInt($td.eq(13).text(), 10),
        },
      };
      status.push(tmp);
    });

    return cheerio.fetch(dataUrls.initial);
  })
  .then((result) => {
    result.$('.style_table tbody tr').each((index, row) =>  {
      const $td = result.$(row).children('td');

      const id = parseInt($td.eq(0).text(), 10);
      const destId = _.findIndex(status, (chara) => {
        return chara.id === id;
      });

      if (destId < 0) {
        return false;
      }

      Object.assign(status[destId].initial, {
        life: parseInt($td.eq(5).text(), 10),
        attack: parseInt($td.eq(6).text(), 10),
        defence: parseInt($td.eq(7).text(), 10),
        speed: parseInt($td.eq(8).text(), 10),
        push: parseInt($td.eq(9).text(), 10),
        critical: parseInt($td.eq(11).text(), 10),
        search: parseInt($td.eq(12).text(), 10),
        hide: parseInt($td.eq(13).text(), 10),
      });
    });

    status = _.sortBy(status, 'id');

    fs.writeFile(config.fetchData.out, JSON.stringify(status, null, '  '), (err) => {
      if (err) throw err;
      $.util.log('status data written!');
    });
  })
  .catch((err) => {
    $.util.log(err);
  });
});

gulp.task('build', ['moveIndex', 'moveMd', 'stylus', 'webpack']);

gulp.task('deploy', () =>  {
  return gulp.src(config.deploy.entry)
    .pipe($.ghPages());
});

gulp.task('watch', () =>  {
  gulp.watch(config.stylus.watch, ['stylus']);
  gulp.watch(config.moveIndex.entry, ['moveIndex']);
  gulp.watch(config.moveMd.entry, ['moveMd']);
});

gulp.task('default', ['moveIndex', 'moveMd', 'stylus', 'webpack-server', 'watch']);
