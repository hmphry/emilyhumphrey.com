function Article() {
    return (
        <article className="article">
            <h2>JavaScript Variables</h2>

            <p className="eyebrow">Originally Published on August 28th, 2019</p>

            <p>
                Variables are a pretty simple concept. For most of JavaScript’s life, the only difficult decision about variables was what to call them. Then ES6 came out and all of a sudden, we have three variable options. Each with different names and properties. So what is the difference? Also, more importantly, when should you use which?
            </p>

            <h3>Readability</h3>

            <p>
                Const is the most readable of the three. That’s because const can never be reassigned in a scope. It has a quite specific and narrow use case. Const is so readable it gives context to let simply by existing. Let value can be reassigned and therefore has an entirely different use case than const. Var, on the other hand, tells you nothing about how the data was intended to be handled. It could be reassigned, and it could not be. Let can indeed suffer from this problem as well, const + let architecture is much more common than const + var because const and let have the same behavior. So while let has the same weakness as var, let was made to be paired with const, which var was not.
            </p>

            <h3>Scope</h3>

            <p>
                Both let and const are block-scoped. Meaning, values initiated inside blocks can not be accessed outside those blocks:
            </p>

            <pre>
                {`if("apples" != "oranges"){
  let a = "apples";
  const b = "oranges"
}

console.log(a) // reference error
console.log(b) // reference error`}
            </pre>

            <p>
                This is a huge behavioral change from var, which is function-scoped:
            </p>

            <pre>
                {`if("apples" != "oranges"){
  var a = "apples";
  var b = "oranges"
}

console.log(a) // "apples"
console.log(b) // "oranges"`}
            </pre>

            <p>
                However, the remarkable thing is, let and const can only be initialized once per scope. That means tracing let and const to their sources is much easier than var, which can be initialized anywhere and reinitialized anywhere!
            </p>

            <pre>
                {`var emergencyActive = true;
var systemOn = emergencyActive ? false : true; // system should always be on unless emergency

function runSystem(){
  console.log(systemOn ? "System is running" : "System is unable to run while emergency is declared");
}

/// five hundred lines later...

var systemOn = true;


runSystem() // logs "System is running"`}
            </pre>

            <p>
                If we had used let, or even better: const, we would have gotten a syntax error. Instead, we got a system, which was designed not to run when an emergency was declared, running when a freaking emergency was declared! Due to this behavior, I think let and const are more reliable than var to hold data.
            </p>

            <h3>Hoisting</h3>

            <p>
                Contrary to popular believe, const and let are indeed hoisted!
            </p>

            <pre>
                {`let favoriteFood = "mac and cheese";

function healthyFood(){
  console.log(favoriteFood)
  let favoriteFood = "Zuchini spirals and cheese"
}

healthyFood() //logs ReferenceError`}
            </pre>

            <p>
                If let and const were not hoisted, than favoriteFoods should have logged Mac and Cheese. Instead, it results in a reference error. This result isn’t because the variable doesn’t exist; it’s because the variable wasn’t initialized! When called before being initialized, let and const exist within something called the Temporal Dead Zone(TDZ). The TDZ isn’t particularly important to understand right now, but instead of resolving as “undefined,” it emits an error. This behavior produces higher visibility of bugs. There are not many reasons to intentionally call a variable before it is initialized.
            </p>

            <h3>In Conclusion</h3>

            <p>
                In my opinion, there isn’t a particularly strong reason to use “var” over “let” or “const.” It’s an unreliable form of data that is less readable, which can cause hard to debug problems and is notoriously difficult to track. So I suggest removing var from your lexicon entirely. This decision also makes the “what declaration to use when” extremely simple going forward: if you plan to reassign, use let. If not, use const.
            </p>
        </article>
    )
}

export default Article
