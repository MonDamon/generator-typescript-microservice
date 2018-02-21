"use strict";
var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");
var path = require("path");
var _ = require("lodash");

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Welcome to the minimal " +
          chalk.red("TypeScript for Microservices") +
          " generator!"
      )
    );

    this.log(
      chalk.cyan("I simply get down to business of generating, no questions asked!") +
        "\n" +
        chalk.yellow(
          "Libraries you ask? I use npm (or optionally gulp) as task runner and mocha for testing."
        ) +
        "\n" +
        chalk.gray(
          "Can you change these? Of course, it's your code. I get out of the way after scaffolding."
        )
    );

    done();
  },

  writing: {
    dir: function() {
      this.directory("src", "src");

      this.fs.copyTpl(
        this.templatePath("test/index-spec.ts"),
        this.destinationPath("test/index-spec.ts")
      );
      this.fs.copyTpl(
        this.templatePath("test/testing/helpers.ts"),
        this.destinationPath("test/testing/helpers.ts")
      );
      this.fs.copyTpl(
        this.templatePath("test/testing/test-console.ts"),
        this.destinationPath("test/testing/test-console.ts")
      );
    },

    projectfiles: function() {
      var today = new Date();

      this.fs.copy(this.templatePath("_wallaby.js"), this.destinationPath("wallaby.js"));

      this.fs.copy(
        this.templatePath("_serverless.yml"),
        this.destinationPath("serverless.yml"),
        { appname: _.kebabCase(path.basename(process.cwd())) }
      );

      this.fs.copy(this.templatePath("_env.yml"), this.destinationPath("env.yml"));

      this.fs.copy(
        this.templatePath("_vscode/tasks.json"),
        this.destinationPath(".vscode/tasks.json")
      );

      this.fs.copyTpl(
        this.templatePath("_package.json"),
        this.destinationPath("package.json"),
        { appname: _.kebabCase(path.basename(process.cwd())) }
      );

      this.fs.copy(this.templatePath("travis.yml"), this.destinationPath(".travis.yml"));

      this.fs.copy(
        this.templatePath("_tsconfig.test.json"),
        this.destinationPath("tsconfig.test.json")
      );

      this.fs.copy(this.templatePath("README.md"), this.destinationPath("README.md"));

      this.fs.copy(this.templatePath("_vscode/*"), this.destinationPath(".vscode/n"));
      this.fs.copy(
        this.templatePath("_tsconfig.json"),
        this.destinationPath("tsconfig.json")
      );
      this.fs.copy(
        this.templatePath("_tslint.json"),
        this.destinationPath("tslint.json")
      );
      this.fs.copy(
        this.templatePath("_launch.json"),
        this.destinationPath(".vscode/launch.json")
      );
      this.fs.copy(
        this.templatePath("editorconfig"),
        this.destinationPath(".editorconfig")
      );
      this.fs.copy(this.templatePath("gitignore"), this.destinationPath(".gitignore"));
      this.fs.copyTpl(this.templatePath("LICENSE"), this.destinationPath("LICENSE"), {
        year: today.getFullYear().toPrecision(4)
      });

      // this.fs.copyTpl(
      //   this.templatePath('scripts/test.ts'),
      //   this.destinationPath('scripts/test.ts')
      // );

      this.fs.copyTpl(
        this.templatePath("scripts/*.ts"),
        this.destinationPath("scripts/")
      );

      // this.fs.copyTpl(
      //   this.templatePath('scripts/watch.ts'),
      //   this.destinationPath('scripts/watch.ts')
      // );

      // this.fs.copyTpl(
      //   this.templatePath('scripts/deploy.ts'),
      //   this.destinationPath('scripts/deploy.ts')
      // );
    }
  },

  install: {
    npmInstall: function() {
      var generator = this;
      generator.npmInstall(
        null,
        { skipInstall: this.options["skip-install"] },
        function() {}
      );
    }
  }
});
