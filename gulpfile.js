const gulp = require('gulp');
const replace = require('gulp-replace');

// Prefixes all src="" attributes in the index.html file with /projects/ai-education/
gulp.task('prefix-src', function(){
    return gulp.src('src/index.html')
        .pipe(replace(/src="(?!https:\/\/)([^"]*)"/g, 'src="/projects/ai-education/$1"'))
        .pipe(replace(/href="(?!https:\/\/)([^"]*)"/g, 'href="/projects/ai-education/$1"'))
        .pipe(gulp.dest('dist'));
});

// Copies all other files over to dist folder
gulp.task('copy-files', function(){
    return gulp.src(['src/**/*', '!src/**/*.html'])
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('prefix-src', 'copy-files'));