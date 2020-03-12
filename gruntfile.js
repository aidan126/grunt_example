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

        babel: {
            options: {
                sourceMap: false,
                presets: ["es2015-without-strict"]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/', //src folder
                        src: ['**/*.js'], //src type
                        dest: 'dist/' //desc folder
                    }
                ]
            }
        },

        uglify: {
            dev: {
                options: {
                    mangle: {
                        reserved: ['jQuery']
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.js'],
                        dest: 'dist/'
                        /* rename: function(dst, src) {
                            // To keep the source js files and make new files as `*.min.js`:
                            // return dst + src.replace('.js', '.min.js');
                            // Or to override to src:
                            // return src;
                        }*/
                    }
                ]
            }
        },

        // remove_usestrict: {
        //     dist: {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: 'dist/',
        //                 src: ['**/*.js'],
        //                 dest: 'dist/'
        //             }
        //         ]
        //     }
        // },

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
                        cwd: 'dist/',
                        src: ['**/*.js'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        ts:{
            options:{
                rootDir:'ts/' // cwd: current working directory
            },
            dist: {
                expand: true,
                src: ['ts/**/*.ts', '*.ts'],
                dest: 'dist/'
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-remove-usestrict');
    grunt.loadNpmTasks('grunt-remove-comments');
    grunt.loadNpmTasks('grunt-ts');

    // 默认被执行的任务列表。
    // grunt.registerTask('default', ['copy', 'babel', 'uglify', , 'remove_comments']);
    // grunt.registerTask('default', ['copy']);
    // grunt.registerTask('default', ['babel']);
    // grunt.registerTask('default', ['remove_comments']);
    grunt.registerTask('default', ["ts"]);
};
