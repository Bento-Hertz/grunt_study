module.exports = function(grunt) {

    //configurações das tasks do gruntfile
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //tasks para o arquivo less
        less: {
            //compila o css 
            dev: {
                files: {
                    './build/dev/styles/main.css': 'src/main.less'
                }
            },
            //comprime o arquivo css
            dist: {
                options: {
                    compress: true
                },
                files: {
                    './build/dist/styles/main.min.css': 'src/main.less'
                }
            }
        },

        //tasks para fazer a substituição do arquivo html
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'build/dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'build/dist/'
                    }
                ]
            }
        },

        //Comprime o arquivo html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        //comprime o arquivo js
        uglify: {
            target: {
                files: {
                    'build/dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        },

        //deleta o prebuild após o carregamento do build
        clean: ['prebuild'],

        //roda as tarefas de modo assíncrono
        concurrent: {
            target: ['less', 'replace']
        },

        //observa mudanças nos arquivos selecionados e roda tasks caso ocorra alguma
        watch: {
            less: {
                files: ['src/main.less', 'src/index.html', 'src/scripts/main.js'],
                tasks: ['less', 'htmlmin', 'replace', 'uglify', 'clean']
            }
        }
    })

    //registra uma nova task
    grunt.registerTask('olaGrunt', function() {
        const done = this.async();
        setTimeout(() => {
            console.log('Olá Grunt');
            done();
        }, 3000);
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
}