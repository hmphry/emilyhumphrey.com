function Article() {
    return (
        <article className="article">
            <h2>Error Handling in Gulp.js</h2>

            <p className="eyebrow">Originally Published on December 3rd, 2014</p>

            <p>
                Working with Gulp, you begin to run into a slightly annoying problem, and that is how gulp handles errors. If you mess up your code, Gulp plugins will not be sure what to do and will return an error. Once the error is returned, Gulp logs it and break the stream. In order to fix the error, you will have to fix the error, then restart your stream. Normally, this isn’t a problem, but after maybe the tenth time, it becomes tiresome. I will outline three different ways you can easily handle errors in your Gulp environment.
            </p>

            <h3>Non-Breaking Errors</h3>

            <p>
                A basic way to handle errors is with the on error method:
            </p>

            <pre>
                {`gulp.task("compile-scss", function(){
	return gulp.src("scss/**/*.scss")
		.pipe(sass({style: "compressed", noCache: true}))
		.on("error", console.log)
		.pipe(gulp.dest("build/scss/**/*.scss"))
});`}
            </pre>

            <p>
                This method will silently log the error to the console, however it won’t break your stream. To customize, you can also call a function, like so:
            </p>

            <pre>
                {`gulp.task("compile-scss", function(){
	return gulp.src("scss/**/*.scss")
		.pipe(sass({style: "compressed", noCache: true}))
		.on("error", errorAlert)
		.pipe(gulp.dest("build/scss/**/*.scss"))
});
function errorAlert(err) {
	console.log(err.toString());
	this.emit("end");
}`}
            </pre>

            <p>
                Of course, all this does is send the same information as previous, but it’s easier to change in case you need to add to it in the future. At any rate, this is nice simple way to handle errors if you save all the time.
            </p>

            <h3>Error Notifications</h3>

            <p>
                Many times with Gulp, I will receive an error and not even notice it. Sometimes, Gulp will send them silently, other times not. In the beginning, I kept saving and refreshing wondering why the change isn’t working. After a few times of this occurrence, I began checking my streams like a fiend. This method will ensure you are always notified on an error, although it will break your stream. It requires a plugin called <a
                    href="https://www.npmjs.com/package/gulp-notify/"
                    target="_blank"
                    rel="noopener"
                >gulp-notify</a>.
            </p>

            <p>
                Much like the previous method, we will be using the on error method. Will then be calling gulp-notify to send an alert to growl.
            </p>

            <pre>
                {`gulp.task("compile-scss", function(){
	return gulp.src("scss/**/*.scss")
		.pipe(sass({style: "compressed", noCache: true}))
		.on("error", notify.onError({
			message: 'Error: <%= error.message %>'
		}))
		.pipe(gulp.dest("build/scss/**/*.scss"))
});`}
            </pre>

            <p>
                Gulp-notify is pretty cool and allows you to customize many things about the message include image, sound, and title.
            </p>

            <h3>Combining Them</h3>

            <p>
                The final version I will go over is combining our error notification system, ran but gulp-notify, with another powerful plugin to create a error message which won’t break your streams. The new plugin is called <a
                    href="https://npmjs.org/package/gulp-plumber/"
                    target="_blank"
                    rel="noopener"
                >gulp-plumber</a>. First, we will create out error function that will be called by plumber in the event of an error.
            </p>

            <pre>
                {`function errorAlert(error){
	notify.onError({title: "SCSS Error", message: "Check your terminal", sound: "Sosumi"})(error); //Error Notification
	console.log(error.toString());//Prints Error to Console
	this.emit("end"); //End function
};`}
            </pre>

            <p>
                From there, we will deviate from the on error method we have been using previous and use plumber’s built in error handler to call our errorAlert function.
            </p>

            <pre>
                {`gulp.task("compile-scss", function(){
	return gulp.src("scss/**/*.scss")
		.pipe(plumber({errorHandler: errorAlert}))
		.pipe(sass({style: "compressed", noCache: true}))
		.pipe(gulp.dest("build/scss/**/*.scss"))
});`}
            </pre>

            <p>
                You will also notice that we included our error handler at the beginning of our task, rather than the end. This is important.
            </p>

            <p>
                And there you have it! Three different ways to handle Gulp errors! If you have any questions or corrections, feel free to reach out on <a
                    href="http://twitter.com/chdhmphry"
                    target="_blank"
                    rel="noopener"
                >twitter</a> or comment below.
            </p>
        </article>
    )
}

export default Article
