# gulp-vssln-dependencies
Creates an ordered list of projects from the projects dependency graph in a Visual Studio Solution (sln) file.

Dependencies are resolved using the information created by the "Project Dependencies" tab in the "Solution Properties" window of Visual Studio. Project references set using the "References" item inside each project are not considered.

gulp-vssln-dependencies returns the projects inside the solution file in build order. That is, if project A depends on project B, then B is returned first, A afterwards. 
## Installation
Install package with NPM and add it to your development dependencies:

`npm install gulp-vssln-dependencies --save-dev`

## Usage
```typescript
var vsprojects = require("gulp-vssln-dependencies");
var gulp = require("gulp");
var tap = require('gulp-tap');

gulp.task('default', function () {
    return gulp.src("test.sln")
        .pipe(vsprojects())
        .pipe(tap(function (file) {
            // Instead of using tap, you could just use any other gulp plugin...
            console.log(file.path);
        }))
});
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)