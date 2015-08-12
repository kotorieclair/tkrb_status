var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
$.nib = require('nib');
$.browserify = require('browserify');
$.babelify = require('babelify');
$.mdify = require('browserify-markdown');
$.cheerio = require('cheerio-httpcli');
$.source = require('vinyl-source-stream');
$.buffer = require('vinyl-buffer');

var dataUrls = {
  "initial": "http://wikiwiki.jp/toulove/?%C5%E1%B7%F5%C3%CB%BB%CE%B0%EC%CD%F7%2F%A5%C6%A1%BC%A5%D6%A5%EB",
  "rankupMax": "http://wikiwiki.jp/toulove/?%C6%C3%20%BA%C7%C2%E7%C3%CD%B0%EC%CD%F7%2F%A5%C6%A1%BC%A5%D6%A5%EB"
};

var compress = $.util.env.compress || false;

gulp.task('stylus', function() {
  return gulp.src('./src/styles/style.styl')
    .pipe($.plumber())
    .pipe($.stylus({
      use: $.nib(),
      import: 'nib',
      compress: compress
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('browserify', function() {
  return $.browserify({
    entries: './src/components/index.jsx',
    extensions: ['.jsx', '.json', '.md']
  })
    .transform($.babelify.configure({
      optional: ['es7.objectRestSpread']
    }))
    .transform($.mdify({
      breaks: true
    }))
    .bundle()
    .on('error', function(err) {
      $.util.log(err);
      this.emit('end');
    })
    .pipe($.source('script.js'))
    .pipe($.buffer())
    .pipe(compress ? $.uglify() : $.util.noop())
    .pipe(gulp.dest('./build'))
});

gulp.task('moveIndex', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('moveMd', function() {
  return gulp.src('./src/data/help.md')
    .pipe($.rename('README.md'))
    .pipe(gulp.dest('./build'));
});

gulp.task('fetchData', function() {
  var statusArray = [];

  $.cheerio.fetch(dataUrls.rankupMax)
  .then(function(result) {
    result.$('.style_table tbody tr').each(function() {
      var $td = result.$(this).children('td');
      var id = $td.eq(0).text();

      if (id == "") {
        return false;
      }

      var tmp = {
        "id": parseInt(id),
        "name": $td.eq(16).children().text(),
        "url1": $td.eq(16).children().attr("href"),
        "url2": $td.eq(2).children().attr("href"),
        "rare": parseInt($td.eq(1).text()),
        "type": $td.eq(3).text(),
        "family": $td.eq(4).text(),
        "slot": parseInt($td.eq(14).text()),
        "rankup": parseInt($td.eq(15).text()),
        "wideness": $td.eq(10).text(),
        "initial": {},
        "rankupMax": {
          "life": parseInt($td.eq(5).text()),
          "attack": parseInt($td.eq(6).text()),
          "defence": parseInt($td.eq(7).text()),
          "speed": parseInt($td.eq(8).text()),
          "push": parseInt($td.eq(9).text()),
          "critical": parseInt($td.eq(11).text()),
          "search":parseInt($td.eq(12).text()),
          "hide": parseInt($td.eq(13).text())
        }
      }
      statusArray.push(tmp);
    });

    return $.cheerio.fetch(dataUrls['initial'])
  })
  .then(function(result) {
    result.$('.style_table tbody tr').each(function() {
      var $td = result.$(this).children('td');

      var id = parseInt($td.eq(0).text());
      var destId = _.findIndex(statusArray, function(chara) {
        return chara.id == id;
      });

      if (destId < 0) {
        return false;
      }

      _.extend(statusArray[destId]['initial'], {
        "life": parseInt($td.eq(5).text()),
        "attack": parseInt($td.eq(6).text()),
        "defence": parseInt($td.eq(7).text()),
        "speed": parseInt($td.eq(8).text()),
        "push": parseInt($td.eq(9).text()),
        "critical": parseInt($td.eq(11).text()),
        "search":parseInt($td.eq(12).text()),
        "hide": parseInt($td.eq(13).text())
      });
    });

    statusArray = _.sortBy(statusArray, 'id');

    fs.writeFile('./src/data/status.json', JSON.stringify(statusArray, null, '  '), function(err) {
      if (err) throw err;
      $.util.log("status data written!");
    });
  })
  .catch(function(err) {
    $.util.log(err);
  });
});

gulp.task('build', ['moveIndex', 'moveMd', 'stylus', 'browserify']);

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe($.ghPages());
});

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/styles/**/*.styl', ['stylus']);
  gulp.watch(['./src/components/**/*.jsx', './src/data/**/*'], ['browserify']);
  gulp.watch('./src/index.html', ['moveIndex']);
  gulp.watch('./src/data/help.md', ['moveMd']);
});
