///<reference path="../_references.ts"/>

var slnparser = require("vssln-parser");
var vsprojects = require("../../");
var gulp = require('gulp');
var tap = require('gulp-tap');
var expect: Chai.ExpectStatic = require('chai').expect;

describe('Gulp sln dependencies', function () {
    const solutionFileName = "dist/test/test.sln";

    it("projects must be returned in the correct order", done => {
        var expectedProjects = [
            'Project4\\Project4.csproj',
            'Project3\\Project3.csproj',
            'Project2\\Project2.csproj',
            'Project1\\Project1.csproj',
            'Project5\\Project5.csproj'
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