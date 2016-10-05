///<reference path="../_references.ts"/>

var dependencies = require("vssln-dependencies");
var vsslnparse = require("vssln-parser");
var fs = require("fs");
var Vinyl = require("vinyl");
var through = require('through2');
var path = require('path');

module.exports = function() {
    return through.obj(function (file, encoding, done) {
        const root = path.dirname(file.path);

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
        vsslnparse(input, function (solution) {
            const sortedProjects = dependencies.fromSolution(solution);
            sortedProjects.forEach(function (project) {
                const projectPath = path.join(root, project.path);
                var file = new Vinyl({path: projectPath});
                $this.push(file);
            });
            done();
        });
    });
}