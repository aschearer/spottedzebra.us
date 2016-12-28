var gulp = require("gulp");
var gutil = require('gulp-util'); 
var exec = require('gulp-exec');

// Compile the site using jekyll
gulp.task("default", function() {
    return gulp.src('_config.yml')
        .pipe(exec('jekyll build --config "<%= file.path %>"'))
        .pipe(exec.reporter());
});

gulp.task("deploy", function() {
    return gulp.src('deploy.yaml')
        .pipe(exec('"tools/stout-windows.exe" deploy --key ' + gutil.env.AWS_KEY + ' --secret ' + gutil.env.AWS_SECRET))
        .pipe(exec.reporter());
});