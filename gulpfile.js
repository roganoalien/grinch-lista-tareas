/****************
 * NODE MODULES *
 ****************/
const	gulp		= require('gulp'),
		autoprefixer= require('gulp-autoprefixer'),
		concat		= require('gulp-concat'),
		connect		= require('gulp-connect'),
		log			= require('./logger'),
		minify		= require('gulp-minify'),
		open		= require('gulp-open'),
		rename		= require('gulp-rename'),
		sass		= require('gulp-sass'),
		sourcemaps  = require('gulp-sourcemaps');

/**************
 * LOCAL VARS *
 **************/
const	$sass	= './src/sass/**/*.scss',
		$d_sass	= './src/sass/main.scss',
		$css	= './public/css/',
		$d_js	= './src/js/**/*.js',
		$js		= './public/js/';

/**********************************
 *              SASS              *
 * COMPILA SASS Y METE AUTOPREFIX *
 **********************************/
gulp.task('sass', () => {
	return gulp.src($d_sass)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
		.pipe(rename('style.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest($css))
		.pipe(connect.reload())
		.on('end', ()=>{
			log('SaSS Compilado', 'purple');
		});
});

/********************************************************************
 *                            CONCAT-JS                             *
 * CONCATENA TODOS LOS VENDORS DE JS Y EMPAQUETA EN UN SOLO ARCHIVO *
 ********************************************************************/
gulp.task('concat-js', ()=>{
	return gulp.src([$d_js])
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest($js)
		.pipe(connect.reload())
		.on('end', ()=>{
			log('JS concatenado', 'yellow');
		});
});

/************************
 * SASS AND JS WATCHERS *
 ************************/
gulp.task('watchers', (done)=>{
	log('Watchers Corriendo', 'yellow');

	gulp.watch($sass, gulp.series('sass'));
	gulp.watch($d_js, gulp.series('concat-js'));

	done();
});
/*********************************************
 *                LIVERELOAD                 *
 * TAREA DE HACER EL LIVERELOAD DEL SERVIDOR *
 *            DE FORMA AUTOMÁTICA            *
 *********************************************/
gulp.task('server', (done)=>{
	connect.server({
		host: '127.0.0.1',
		root: './',
		port: 3000,
		livereload: true
	});
	done();
});
/*************************************************************
 *                           OPEN                            *
 * ABRE UNA VENTANA DEL NAVEGADOR, CON LA DIRECCIÓN INDICADA *
 *************************************************************/
gulp.task('open', ()=>{
	return gulp.src('./index.html')
		.pipe(open({ uri: `http://localhost:3000/` }));
});

gulp.task('dev', gulp.series('sass', 'concat-js', gulp.parallel('watchers', 'server', 'open')));