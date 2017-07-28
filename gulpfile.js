//se colocan en variables todas las dependencias de desarrollo que se nesecitan en el task

var gulp = require("gulp"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	minifyCSS = require("gulp-minify-css"),
	webserver = require("gulp-webserver");

//primera tarea llamada script, esta concatenara nuestros archivos js, convirtiendola en script.js el que se guardara en una carpeta llamada dist, sera el que finalmente se linkeara en el html

gulp.task("script", function() {
	gulp.src(["node_modules/jquery/dist/jquery.js", "node_modules/bootstrap-css/dist/js/bootstrap.js", "assets/js/*.js"])
		.pipe(concat("script.js"))
		.pipe(gulp.dest("dist/js/"));
});

//segunda tarea llamada style, esta concatenara y minificara nuestro archivo main.scss convirtiendolo en style.min.css el que ase guardara en una carpeta llamada dist, sera el que finalmente se linkeara en el html

gulp.task("style", function() {
	gulp.src(["node_modules/bootstrap-css/dist/css/bootstrap-css", "assets/sass/main.scss"])
		.pipe(sass().on("error", sass.logError))
		.pipe(minifyCSS())
		.pipe(concat("style.min.css"))
		.pipe(gulp.dest("dist/css/"));
});

//tercera tarea llamada webserver, la cual creara un servidor web de desarrollo que se ejecutara en el localhost puerto 8000

gulp.task("webserver", function() {
	gulp.src("../tea-lovers")
		.pipe(webserver({
			fallback: "index.html",
			livereload: true,
			directoryListing: false,
			open: true
		}));
});

//se le indica a gulp cuales son las tareas que debe ejecutar al hacer correr el comando gulp en la terminal

gulp.task("default", ["script", "style", "webserver"]);