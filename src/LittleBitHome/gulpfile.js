/// <binding Clean='main-bower-files' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var mainBowerFiles = require("gulp-main-bower-files");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var gulpFilter = require("gulp-filter");
var cleanCss = require("gulp-clean-css");
var print = require("gulp-print");

gulp.task("BowerFiles-Copy-Clean", function () {
    var filterJs = gulpFilter("**/*.js", { restore: true });
    return gulp.src("./bower.json")
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        "./dist/js/bootstrap.min.js",
                        "./dist/css/*.min.*",
                        "./dist/fonts/*.*"
                    ]
                },
                'font-awesome': {
                    main: "./css/font-awesome.min.css"
                }
            }
        }))
        .pipe(print())
        .pipe(filterJs)
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(filterJs.restore)
        .pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task("Copy-font-files", function() {
    return gulp.src("./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}")
        .pipe(gulp.dest("./wwwroot/lib/font-awesome/fonts"));
})