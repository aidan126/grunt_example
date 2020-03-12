#  grunt 
> ref:[Getting started](https://gruntjs.com/getting-started)


### install globally for use CLI

- `npm install -g grunt-cli`



### install locally

- `npm isntall grunt --save-dev`



### install gruntplugins

-  `npm install grunt-contrib-copy`





### create config file 

- create file `gruntfile.js`

- ```js
  module.exports = function(grunt) {
      // Project configuration.
      grunt.initConfig({
          pkg: grunt.file.readJSON('package.json'),
          // Project configuration.
  
          // copy all files from js/ to dist/
          copy: {
              main: {
                  expand: true,
                  // cwd: 'js/',
                  src: ['js/**/*.js', '*.js'],
                  dest: 'dist/'
              }
          },
  
          //寫法2
          remove_comments: {
              options: {
                  multiline: true,
                  singleline: true,
                  keepSpecialComments: false
              },
              dist: {
                  files: [
                      {
                          expand: true,
                          cwd: 'dist/',  //current working directory
                          src: ['**/*.js'],  // files to inlclude 
                          dest: 'dist/'      // output location
                      }
                  ]
              }
          }
      });
  
      // 加载包含 "uglify" 任务的插件。
      grunt.loadNpmTasks('grunt-contrib-copy');
  
      // 默认被执行的任务列表。
      grunt.registerTask('default', ['copy']);
  };
  
  ```



### execute task

- run `grunt`  in cmd

