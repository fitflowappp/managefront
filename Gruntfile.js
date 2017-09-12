module.exports = function (grunt) {

    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks
    require("grunt-contrib-copy")(grunt);
    require("grunt-exec")(grunt);

    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['*.js'],
                        cwd: 'src/',
                        dest: 'publish/'
                    },
                    {
                        expand: true,
                        dest: 'publish/actions/',
                        cwd: 'src/actions/',
                        src: ['**/*.js'],
                    },
                    {
                        expand: true,
                        dest: 'publish/common/',
                        cwd: 'src/common/',
                        src: ['**/*.js'],
                    },
                    {
                        expand: true,
                        dest: 'publish/components/',
                        cwd: 'src/components/',
                        src: ['**/*.js'],
                    },
                    {
                        expand: true,
                        dest: 'publish/containers/',
                        cwd: 'src/containers/',
                        src: ['**/*.js'],
                    },
                    {
                        expand: true,
                        dest: 'publish/reducers/',
                        cwd: 'src/reducers/',
                        src: ['**/*.js'],
                    },
                    {
                        expand: true,
                        dest: 'publish/store/',
                        cwd: 'src/store/',
                        src: ['**/*.js'],
                    }
                ]

            }
        },
        copy: {
            files: {
                expand: true,
                dest: 'publish/dist/',
                cwd: 'src/dist/',
                src: '**/*'
            }
        },
        exec: {
            webpack: 'webpack'
        }
    });

    grunt.registerTask("default", ["exec","babel","copy"]);


};