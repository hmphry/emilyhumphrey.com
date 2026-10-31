function Article() {
    return (
        <article className="article">
            <h2>The JS Engine</h2>

            <p className="eyebrow">Originally Published on August 30th, 2019</p>

            <p>
                Have you ever considered how a browser turns your JavaScript into a functional application? The answer is the JavaScript engine. It’s this vital application that is responsible for taking your code and transforming it into a beautiful experience and learning more about it results in more efficient code.
            </p>

            <p>
                Each browser has a different JS engine. For instance, Chrome has V8, Firefox has SpiderMonkey, and Safari has Nitro. However, these are almost all made up of the same concept: Heap + Stack = Engine. The Heap is responsible for memory allocation while the Stack is responsible for executing your code.
            </p>

            <h3>The Heap</h3>

            <p>
                The Heap is in charge of executing the memory life cycle. The memory life cycle is:
            </p>

            <ol>
                <li>
                    Memory you need is reserved
                </li>
<li>
                    The application uses the reserved memory
                </li>
<li>
                    The reserved memory is released
                </li>
            </ol>

            <p>
                The Heap performs these actions automatically without consent from the developer in a process known as garbage collection. Let’s break down each task.
            </p>

            <h3>Memory is allocated</h3>

            <p>
                Every time you declare a function or variable in javascript, it gets written to memory. The Heap determines allocation needed for each declaration depending on value. It’s important to note that each declaration is defined as its type. The Heap will allocate a number enough space for a number. A function, a function. This means how you structure data matters greatly.
            </p>

            <h3>Memory is used</h3>

            <p>
                When your application references a declared value, it reads from memory. When you update a value, it writes to memory.
            </p>

            <h3>Memory is released</h3>

            <p>
                When a value is no longer needed, the Heap releases the value from memory in a process known as garbage collection. The developer is unable to manually clear memory in JavaScript.
            </p>

            <h3>The Stack</h3>

            <p>
                The Stack, sometimes referred to as the CallStack, is a program that manages what functions run and when. Since JavaScript is single-threaded, the Stack runs one function at a time. The Stack begins empty, but every time we evoke a function, the Stack grows.
            </p>

            <pre>
                {`function givePez(){
  returns "gave pez";
}
function loadPez(){
  returns "loaded pez";
}
function dispensePez(){
  givePez()
  loadPez()
  return "pez has been dispensed";
}

dispensePez()`}
            </pre>

            <p>
                The execution of the above code is as such:
            </p>

            <ol>
                <li>
                    The Stack is empty. All the function declarations are initially ignored by the call Stack.
                </li>
<li>
                    The Stack is empty. It reaches the dispensePez call. It adds dispensePez to the Stack.
                </li>
<li>
                    The Stack contains dispensePez. While running dispensePez, it reaches givePez call and pauses. It adds givePez to the Stack
                </li>
<li>
                    The Stack contains dispensePez and givePez. It finishes givePez and it is removed from the Stack.
                </li>
<li>
                    The Stack contains dispensePez. While running dispensePez, it reaches loadPez call and pauses. It adds loadPez to the Stack
                </li>
<li>
                    The Stack contains dispensePez and loadPez. It finishes loadPez and it is removed from the Stack.
                </li>
<li>
                    The Stack contains dispensePez. It finishes dispensePez and it is removed from the Stack.
                </li>
<li>
                    The Stack is empty.
                </li>
            </ol>

            <p>
                Like when loading a Pez dispenser, the last invoked is always the first to finish. This is called Last In, First Out or LIFO for short.
            </p>

            <h3>Blowing the Stack</h3>

            <p>
                Nested functions and recursion can cause the Stack to overflow in what is known as “blowing the stack.” When this happens, the browser emits an error and stops running your code.
            </p>

            <h3>Optimizing Your Code</h3>

            <p>
                While we can not control memory manually, how we code our applications affect it considerably. Here are a few examples of how to write memory efficient JavaScript.
            </p>

            <h3>Use the right value</h3>

            <p>
                As mentioned previous, different data structure uses different amounts of memory. Strings and numbers are relatively small, while objects and functions are quite large. Tailer your code to use the correct types to save memory.
            </p>

            <h3>Manage Scope</h3>

            <p>
                Try to avoid global scope, opting for storing values in local scope instead. When a function finishes, it’s scope is sent to the garbage collector. The garbage collector still may not remove it, but this is the best we can do.
            </p>

            <h3>Be careful with Closures, Loops, and Timers</h3>

            <p>
                Closures, loops, and timers are incredibly prone to memory leaks. While necessary, be sure to code these optimally.
            </p>

            <h3>Unbind event listeners</h3>

            <p>
                When you’re done listening, unbind your event. Doing so sends the old binding to the garbage collector and release the memory reserved for it.
            </p>
        </article>
    )
}

export default Article
