///<reference path="../_references.ts"/>

var dependencies = require("vssln-dependencies");
var parse = require("vssln-parser").parse;
var fs = require("fs");
var Vinyl = require("vinyl");
var through = require('through2');

module.exports = function() {
    return through.obj(function (file, encoding, done) {
        var input;
        if (file.isStream()) {
            input = file.stream;
        }
        else if (file.isBuffer()) {
            input = String.fromCharCode.apply(null, file.contents);
        }
        else {
            throw new Error("The file type is not supported");
        }

        var $this = this;
        parse(input, function (solution) {
            const sortedProjects = dependencies.fromSolution(solution);
            sortedProjects.forEach(function (project) {
                var file = new Vinyl({path: project.path});
                $this.push(file);
            });
            done();
        });
    });
}