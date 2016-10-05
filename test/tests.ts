///<reference path="../_references.ts"/>

var vsprojects = require("../../");
var gulp = require('gulp');
var path = require('path');
var tap = require('gulp-tap');
var expect: Chai.ExpectStatic = require('chai').expect;

describe('Gulp sln dependencies', function () {
    const solutionFileName = "dist/test/test.sln";
    const root = path.join(process.cwd(), path.dirname(solutionFileName));

    it("projects must be returned in the correct order", done => {
        var expectedProjects = [
            path.join(root, 'Project4\\Project4.csproj'),
            path.join(root, 'Project3\\Project3.csproj'),
            path.join(root, 'Project2\\Project2.csproj'),
            path.join(root, 'Project1\\Project1.csproj'),
            path.join(root, 'Project5\\Project5.csproj')
        ];
        var index = 0;

        gulp.src(solutionFileName)
            .pipe(vsprojects())
            .pipe(tap(function (file) {
                expect(file.path).to.equal(expectedProjects[index++]);
            }))
            .on('end', done);
    });
});