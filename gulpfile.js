const {src, dest, series, parallel} = require('gulp');

const defaultTask = () =>{
    return src('src/*.html').pipe(dest('dist'));
}

const script = () => {
    return src('src/script/*.js').pipe(dest('dist/script'));
}

const style = () => {
    return src('src/style/*.css').pipe(dest('dist/style'));
}


exports.default = defaultTask;
exports.build = parallel(defaultTask,series(script,style));