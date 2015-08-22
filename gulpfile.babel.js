import fs from 'fs';
import _ from 'lodash';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import nib from 'nib';
import browserify from 'browserify';
import babelify from 'babelify';
import mdify from 'browserify-markdown';
import cheerio from 'cheerio-httpcli';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
const $ = plugins();
$.nib = nib;
$.browserify = browserify;
$.babelify = babelify;
$.mdify = mdify;
$.cheerio = cheerio;
$.source = source;
$.buffer = buffer;

const config = {
  dataUrls: {
    initial: 'http://wikiwiki.jp/toulove/?%C5%E1%B7%F5%C3%CB%BB%CE%B0%EC%CD%F7%2F%A5%C6%A1%BC%A5%D6%A5%EB',
    rankupMax: 'http://wikiwiki.jp/toulove/?%C6%C3%20%BA%C7%C2%E7%C3%CD%B0%EC%CD%F7%2F%A5%C6%A1%BC%A5%D6%A5%EB',
  },
  build: './build',
  stylus: {
    entry: './src/styles/style.styl',
    watch: './src/styles/**/*.styl',
  },
  browserify: {
    entry: './src/index.js',
    out: 'script.js',
    watch: ['./src/components/**/*.jsx', './src/data/**/*'],
  },
  moveIndex: {
    entry: './src/index.html',
  },
  moveMd: {
    entry: './src/data/help.md',
    out: 'README.md',
  },
  fetchData: {
    out: './src/data/status.json',
  },
  deploy: {
    entry: './build/**/!(*.map)',
  },
};

let compress = $.util.env.compress || false;

gulp.task('stylus', () =>  {
  return gulp.src(config.stylus.entry)
    .pipe($.plumber())
    .pipe($.stylus({
      use: $.nib(),
      import: 'nib',
      compress: compress,
    }))
    .pipe(gulp.dest(config.build));
});

gulp.task('browserify', () =>  {
  function handleError(err) {
    $.util.log(err);
    this.emit('end');
  }

  return $.browserify({
    entries: config.browserify.entry,
    extensions: ['.jsx', '.json', '.md'],
    debug: true,
  })
    .transform($.babelify.configure({
      optional: ['es7.objectRestSpread'],
    }))
    .transform($.mdify({
      breaks: true,
    }))
    .bundle()
    .on('error', handleError)
    .pipe($.source(config.browserify.out))
    .pipe($.buffer())
    .pipe($.sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(compress ? $.uglify() : $.util.noop())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.build));
});

gulp.task('moveIndex', () =>  {
  return gulp.src(config.moveIndex.entry)
    .pipe(gulp.dest(config.build));
});

gulp.task('moveMd', () =>  {
  return gulp.src(config.moveMd.entry)
    .pipe($.rename(config.moveMd.out))
    .pipe(gulp.dest(config.build));
});

gulp.task('fetchData', () =>  {
  let status = [];

  $.cheerio.fetch(config.dataUrls.rankupMax)
  .then((result) => {
    result.$('.style_table tbody tr').each((row) =>  {
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

    return $.cheerio.fetch(config.dataUrls.initial);
  })
  .then((result) => {
    result.$('.style_table tbody tr').each((row) =>  {
      const $td = result.$(row).children('td');

      const id = parseInt($td.eq(0).text(), 10);
      const destId = _.findIndex(statusArray, (chara) => {
        return chara.id === id;
      });

      if (destId < 0) {
        return false;
      }

      _.extend(statusArray[destId].initial, {
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

gulp.task('setCompress', () => {
  compress = true;
});

gulp.task('build', ['moveIndex', 'moveMd', 'stylus', 'browserify']);

gulp.task('deploy', ['setCompress', 'build'], () =>  {
  return gulp.src(config.deploy.entry)
    .pipe($.ghPages());
});

gulp.task('watch', ['build'], () =>  {
  gulp.watch(config.stylus.watch, ['stylus']);
  gulp.watch(config.browserify.watch, ['browserify']);
  gulp.watch(config.moveIndex.entry, ['moveIndex']);
  gulp.watch(config.moveMd.entry, ['moveMd']);
});
