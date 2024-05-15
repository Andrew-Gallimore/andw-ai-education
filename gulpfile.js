const gulp = require('gulp');
const replace = require('gulp-replace');
const extractCriticalCss = require('gulp-extract-critical-css');

// Custom defined variables
const path = '/projects/ai-education';
const desitnationFold = 'dist';

// Prefixes all src="" and href="" attributes in the index.html file with what ever path is set to
gulp.task('prefix-src', function(){
    return gulp.src(desitnationFold + '/index.html')
        .pipe(replace(/src="(?!https:\/\/)([^"]*)"/g, `src="${path}/$1"`))
        .pipe(replace(/href="(?!https:\/\/)([^"]*)"/g, `href="${path}/$1"`))
        .pipe(gulp.dest(desitnationFold));
});


// Above/Below the fold CSS
// this puts above the fold css inline inside the html file
gulp.task('critical-css', function(){
    return gulp.src(desitnationFold + '/css/index.css')
        .pipe(extractCriticalCss({
            inlinePath: desitnationFold + '/index.html',
            inlineCritical: true,
            modifySource: true
        }))
        .pipe(gulp.dest(desitnationFold + '/css/'));
});

// Copies all other files over to dist folder
gulp.task('copy-files', function(){
    return gulp.src(['src/**/*'])
        .pipe(gulp.dest(desitnationFold));
});

gulp.task('dev', gulp.series('copy-files', 'critical-css'));
gulp.task('default', gulp.series('prefix-src', 'copy-files', 'critical-css'));