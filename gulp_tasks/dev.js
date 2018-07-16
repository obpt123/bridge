var gulp = require("gulp");
var browserify = require("browserify");
gulp.task("dev",["html","ts","js"])

var config=require("../taskconfig.json");
var ts = require("gulp-typescript");
var tsproj = ts.createProject("tsconfig.json");
var source = require('vinyl-source-stream');
var concat=require("gulp-concat");
var tsify=require("tsify");
gulp.task("ts", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/api/api.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
    // return tsproj.src()
    //     .pipe(tsproj())
    //     .js.pipe(concat("bundle.js"))
    //     .pipe(gulp.dest(config.ts.output));
});

gulp.task("html",function(){
    return gulp.src(config.html.input)
        .pipe(gulp.dest(config.html.output));
});
gulp.task("js",function(){
    return gulp.src(config.js.input)
        .pipe(gulp.dest(config.js.output));
});