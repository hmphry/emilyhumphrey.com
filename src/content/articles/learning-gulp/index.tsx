function Article() {
    return (
        <article className="article">
            <h2>Learning Gulp</h2>

            <p className="eyebrow">Originally Published on June 11th, 2014</p>

            <p>
                <strong>This post is not updated and may not reflect current best practices.</strong>
            </p>

            <p>
                Gulp is a JavaScript based automatic task runner. With it, you can compile sass, include &amp; concat files, package JavaScript, upload files to servers and much more. You can, of course, do all that without Gulp, but it’s a lot easier with it. In his gitbook, David Nowinsky described Gulp as a factory. I really like this description. Gulp, much like a factory, takes files and turns them into other files with very minimal effort. In this guide, we will learn the basics of gulp.js, how to avoid some common pitfalls, and build our own gulp system.
            </p>

            <h3>The Basics</h3>

            <h3>Plugins</h3>

            <p>
                Plugins extend the functionality of Gulp. Gulp’s philosophy is that plugins should only perform one action, this way it is easy to combine plugins to create complicated functionality easily. All approved plugins are listing on Gulp’s plugin page. Gulp curates their plugins to ensure high quality. It’s suggested you use the official Gulp plugin database so you do not use harmful or non-working plugins.
            </p>

            <h3>Streams</h3>

            <p>
                Gulp uses streams to link programs, or in this case plugins, together. This relieves your system of temporary files while providing blazing fast functionality. Going back to the factory analogy, they are the conveyor belts, moving from one program to the other.
            </p>

            <h3>Tasks</h3>

            <p>
                Tasks are how you control Gulp and are defined with gulp.task function. Tasks can do many things, including interacting with plugins and streams. You can link tasks together and create dependencies. If streams are the conveyor belt, then tasks are the assembly line.
            </p>

            <h3>Getting Started</h3>

            <h3>Installation</h3>

            <p>
                Installation for macs are pretty simple, however there are a few dependencies you’ll need. The first thing you’ll need is node.js. After that, you’ll need Node Package Manager, or NPM for short. NPM will handle your plugins for gulp and gulp itself, but it does many awesome things on its own. To install npm, open up your console and enter <code>sudo curl -L https://npmjs.org/install.sh | sh</code>. You’ll be prompted for your password. Once you have NPM, run <code>npm install gulp -g</code> to install gulp globally.
            </p>

            <h3>Building Your Gulpfile</h3>

            <p>
                Now that you have a grasp on the basics and have everything installed, it’s time to build you own gulp file! First, you have to figure out what you want your gulpfile to do. if I had to figure out my favorite task to auto has to be SCSS to CSS with an auto-prefixer. You should start off by searching the official <a
                    href="http://gulpjs.com/plugins/"
                    target="_blank"
                    rel="noopener"
                >Gulp plugin database</a> for the correct plugins. However, I have two favorites that’ll do the job just fine, <a
                    href="https://www.npmjs.com/package/gulp-scss/"
                    target="_blank"
                    rel="noopener"
                >gulp-scss</a> and <a
                    href="https://www.npmjs.com/package/gulp-autoprefixer/"
                    target="_blank"
                    rel="noopener"
                >gulp-autoprefixer</a>.
            </p>

            <p>
                Once you have found the plugins, it’s time to install them. To install, open the console and navigate to your project. Then enter <code>npm install gulp-scss --save-dev</code>. This will install gulp-scss and mark it as a dependency in your package.json file. This is important because instead of having to commit or send the large node_modules, the directory where your NPM plugins are stored, you can simply commit this file. Other developers can then install the required dependencies with <code>npm install --dev</code>.
            </p>

            <p>
                Time to kick off some gulp development! First thing you need to include is the plugins you just installed:
            </p>

            <pre>
                {`var gulp = require('gulp');
var scss = require('gulp-scss');
var prefix = require('gulp-autoprefixer');`}
            </pre>

            <p>
                The dependencies are very important to include. If not included, gulp won’t know what to do and will error out. After the dependencies are included, we can build our first task. Tasks have 4 elements that you need to know:
            </p>

            <h3>Name</h3>

            <p>
                The name is pretty self explanatory, I feel. It’s what your task is called, and how it’s called. Each task’s name should be unique. A task named “default” will run on <code>gulp</code> command. Otherwise, <code>gulp task-name</code> will run your task.
            </p>

            <h3>Source</h3>

            <p>
                The source is the path to the file you’d like to run through gulp. It can be a direct file, such as “css/main.scss” or it can be multiple files like “css/*.css” or “css/**/*.scss”. The former will get all files in the top level of the css directly while the latter will get every file, even “css/asburd/path/to/file.scss”. it is also possible to have an array, to you can have multiple inputs.
            </p>

            <h3>Pipes</h3>

            <p>
                Pipes is like, well, a pipe. If you’re experienced with the console, it probably rings a bell. Pipes is how gulp moves the input from one plugin to another.
            </p>

            <h3>Destination</h3>

            <p>
                The final pipe is the destination, more often than not. This is where you want the final file to be. It should be a path to a folder, and it will assume the source file name. You can use a plugin to change that, but it is not possible through gulp.dest as far as I know.
            </p>

            <p>
                Below is an example of a gulpfile. It’ll take a scss file, compile it to css and then use the auto-prefixer to insert browser prefixes. When it’s done, it’ll output a css file to “public/css”.
            </p>

            <pre>
                {`var gulp = require('gulp');
var scss = require('gulp-scss');
var prefix = require('gulp-autoprefixer');

gulp.task('defualt', function(){
	return gulp.src('main.scss')
	.pipe(sass())
	.pipe(prefix())
	.pipe(gulp.dest('public/css'));
});`}
            </pre>

            <p>
                To run our gulp file, simply enter <code>gulp</code>.
            </p>

            <h3>Advanced Techniques</h3>

            <p>
                Now that you have the basics down pat, it’s time for something more challenging…
            </p>

            <h3>Chaining</h3>

            <p>
                Chaining is pretty cool. It taking one task and calling another before running. In the example below, I am chaining “sass-to-css” to “prefix-css”. Now, when I call “prefix-css”, it will run “sass-to-css” beforehand.
            </p>

            <pre>
                {`var gulp = require('gulp');
var scss = require('gulp-scss');
var prefix = require('gulp-autoprefixer');

gulp.task('sass-to-css', function(){
	return gulp.src('main.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/css'));
});
gulp.task('prefix-css', ['scss-to-css'], function(){
	return gulp.src('public/css/main.scss')
	.pipe(prefix())
	.pipe(gulp.dest('public/css'));
});`}
            </pre>

            <h3>Watching</h3>

            <p>
                You can also set up gulp to only run when a file is changed.
            </p>

            <pre>
                {`var gulp = require('gulp');
var scss = require('gulp-scss');
var prefix = require('gulp-autoprefixer');

gulp.task('sass-to-css', function(){
	return gulp.src('main.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/css'));
});
gulp.task('prefix-css', ['scss-to-css'], function(){
	return gulp.src('public/css/main.scss')
	.pipe(prefix())
	.pipe(gulp.dest('public/css'));
});

gulp.task("watch", function(){
	gulp.watch("main.scss", ["prefix-css"]);
});`}
            </pre>

            <p>
                When you run <code>gulp watch</code>, it will not end like a normal task. It will remain open, watching for changes to “main.scss”. Once a change is saved, it will run “prefix-css”.
            </p>

            <h3>Error Handling</h3>

            <p>
                Error handling is very important, especially when using watching. For a while, I had to watch my watch task to make sure an error didn’t break it. Now, I have a dedicated error handle that sends an alert and even notifies me with sound. This is a pretty indepth topic, and has it’s own post <a
                    href="http://hmphry.com/articles/error-handling-in-gulp-js"
                    target="_blank"
                    rel="noopener"
                >here</a>.
            </p>
        </article>
    )
}

export default Article
