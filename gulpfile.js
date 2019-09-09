"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var htmlmin = require("gulp-htmlmin");
var htmlvalidator = require("gulp-w3c-html-validator");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var editorconfig = require("gulp-lintspaces");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var del = require("del");
var server = require("browser-sync").create();
var settings = require("./package.json");
var isDev = process.env.NODE_ENV !== "production";

gulp.task("editorconfig", function () {
  return gulp.src(settings["editorconfig-cli"])
    .pipe(plumber())
    .pipe(editorconfig({ editorconfig: `.editorconfig` }))
    .pipe(editorconfig.reporter());
});

gulp.task("html", function () {
  return gulp.src("source/**/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(htmlvalidator())
    .pipe(htmlvalidator.reporter())
    .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/css/style.css", { sourcemaps: isDev })
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(server.stream());
});

gulp.task("js", function () {
  return gulp.src([
    "node_modules/svg4everybody/dist/svg4everybody.min.js",
    "source/js/start.js",
    "source/js/script.js"
  ], { sourcemaps: isDev })
    .pipe(concat("script.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/js", { sourcemaps: "." }));
});

gulp.task("imagemin", function () {
  return gulp.src("source/imagemin/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo(settings.svgoConfig)
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"));
});


gulp.task("sprite", function () {
  return gulp.src("source/img/sprite-icons/**/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src(
    "source/css/normalize.css", {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("server", function () {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/**/*.html", gulp.series("html", "reload"));
  gulp.watch("source/js/**/*.js", gulp.series("js", "reload"));
  gulp.watch("source/img/sprite-icons/**/*.svg", gulp.series("sprite", "reload"));
  gulp.watch("source/imagemin/**/*.{jpg,png,svg}", gulp.series("imagemin", "css", "reload"));
  gulp.watch(settings["editorconfig-cli"], gulp.series("editorconfig", "reload"));
});

gulp.task("reload", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  gulp.parallel("editorconfig", "clean", "imagemin"),
  gulp.parallel("html", "css", "js", "sprite", "copy", "images")
));
gulp.task("start", gulp.series("build", "server"));
