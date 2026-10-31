function Article() {
    return (
        <article className="article">
            <h2>Hoisting</h2>

            <p className="eyebrow">Originally Published on September 28th, 2022</p>

            <p>
                Hoisting in the English language means to lift or pull something upwards. In JavaScript, this means much the same. Hoisting is a process where the declarations of functions, variables, and classes are lifted to the top of their local scope before executing the code. Hoisting lets developers define their variables and functions anywhere in the code without worrying about reference errors.
            </p>

            <p>
                Let’s dive into hoisting.
            </p>

            <h3>Hoisting Is An Unintended Consequence</h3>

            <p>
                It’s important to note that there isn’t a defined process for hoisting in JavaScript. Hoisting is just an implied behavior of compilers during the interpretation process. Before executing JavaScript, the browser interprets the entirety of the script. During this process, declarations are hoisted to the top of their scope automatically, whether they’re called or not.
            </p>

            <h3>Variable Hoisting</h3>

            <p>
                Hoisting works for all container types in JavaScript; however, the behavior differs between “var” and the other keywords. Only variables declared with “var” will be hoisted to the top of the scope with an undefined value. This will not throw an error.
            </p>

            <pre>
                {`console.log("What is 50 * 2? " + num); // num is undefined

var num = 100;

console.log("What is 50 * 2? " + num);  // num is 100`}
            </pre>

            <p>
                However, variables declared with “let” and “const” will exist in the Temporal Dead Zone and throw a reference error.
            </p>

            <h3>The Temporal Dead Zone</h3>

            <p>
                The Temporal Dead Zone, or TDZ for short, is a state in the compiler where the variables are known in scope but have an unknown value. The code will throw a reference error if the variables are referenced before their initialization. This behavior might seem counter-intuitive to the concept of hoisting, but it is beneficial when debugging.
            </p>

            <h3>Function Hoisting</h3>

            <p>
                Function hoisting is advantageous because it allows us to hide function declarations towards the bottom of the file. When combined with comments, this makes a complex application much more readable.
            </p>

            <pre>
                {`resetScore();
drawGameBoard();
populateGameBoard();
startGame();

function resetScore() {
  // complex functionality to reset the score
}

function drawGameBoard() {
  // complex functionality to draw the game board
}

function populateGameBoard() {
  // complex functionality to populate the game board
}

function startGame() {
  // complex functionality to start the game
}`}
            </pre>

            <p>
                Looking at this code gives one an immediate idea of what the application does without reading all of the functionality.
            </p>

            <p>
                Hoisting is a powerful tool if utilized correctly. It’s often branded as “complex,” but in reality, it’s just misunderstood. You’re likely already using hoisting without even realizing it!
            </p>
        </article>
    )
}

export default Article
