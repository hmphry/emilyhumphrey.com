function Article() {
    return (
        <article className="article">
            <h2>CSS Kind of Hates You</h2>

            <p className="eyebrow">Originally Published on July 19th, 2015</p>

            <p>
                CSS can be a tricky things at times. It can be good in the right hands, or a painful ordeal in everyone else’s. In this article, I will go over three different types of weird CSS quirks, and how to avoid the pitfalls associated with them
            </p>

            <h3>Selector Hierarchy</h3>

            <p>
                This is probably the most talked about instance of CSS hierarchy in recent years. It is the reason why many developers avoid using IDs in their styles like it’s a plague. I’ll admit, I am no fan of the ID selector, but it gets a bum rap. The CSS community has made it into an infamous monster, of sorts. A monster so great, it ate all the other infamous monsters, The Internet Explorer Monster Browser included, to absorb their powers. But like most movie monsters, it’s not evil; just misunderstood. So why is the ID selector so hated?
            </p>

            <h3>It’s The Most Powerful Of All Selectors</h3>

            <p>
                The ID selector ranks at the very top of the selectors and enforces its will, regardless of context. There is no combination of CSS selectors that can overwrite an ID that doesn’t include the ID itself. The ID is king. Consider this example:
            </p>

            <p>
                You have a div with the class “text” on it. Inside .text, there is a paragraph with an ID of “intro” and a class of “blue”.
            </p>

            <pre>
                {`#intro{
   font-size: 1.2em;
   color: red;
}
.blue{
   color: blue;
}
p.blue{
   color blue;
}
.text > div.blue{
   color: blue;
}`}
            </pre>

            <p>
                What color do you think #intro will be? #intro will be red. Despite it having no descendant tags and being at the top of the sheet, #intro will be red. If decedent tags and cascading hierarchy won’t work, how do you change #intro’s color? You can:
            </p>

            <ul>
                <li>
                    Change the ID styles. This is not a great solution. What if there are other #intros on other pages?
                </li>
<li>
                    Create a stronger combination of selectors. This is probably the best solution. A super selector like #red.blue will overwrite #red. It can get a bit messy after a while and defeats the purpose of having a class, however, it works.
                </li>
<li>
                    Add an !important to one of the would-be overwriting styles. However, !important should only be used in the direst of circumstances. Repeat after me: “!important should only be used in the direst of circumstances”. Very good.
                </li>
<li>
                    If IDs are too powerful, what should we use? Some developers simply ignore them. They use a mixture of element tags and classes. Using this method, everything can be overwritten fairly easily if needed:
                </li>
            </ul>

            <pre>
                {`.intro{
   color: red;
}
.blue{
   color: blue;
}`}
            </pre>

            <p>
                .blue will overwrite .intro’s color by simple hierarchy. However, you can also use element tags with descenders to overwrite .intro’s styles, without the additional class:
            </p>

            <pre>
                {`.intro{
   color: red;
}
.text p{
   color: blue;
}`}
            </pre>

            <p>
                When it comes to the ID selector, I follow the Uncle Ben method:
            </p>

            <blockquote>
                <p>
                    With great power comes great responsibility.
–Uncle Ben
                </p>
            </blockquote>

            <p>
                Use IDs if you need them, but be very, very careful with them.
            </p>

            <h3>It Cannot Be Reused In A Page</h3>

            <p>
                Personally, this is the most annoying problem of IDs. IDs can, semantically speaking, only be used once on a page. Most browsers will still render them multiple times, but they were just meant to be used once. Your HTML won’t validate.
            </p>

            <h3>It Forces Us To Use The Shift Key</h3>

            <p>
                This one just might be me. Dots take less effort to write than pound signs. #fact
            </p>

            <h3>Stacking Z-Indexes</h3>

            <p>
                In 2012, <a
                    href="http://philipwalton.com/articles/what-no-one-told-you-about-z-index/"
                    target="_blank"
                    rel="noopener"
                >Phillip Walton</a> wrote about the strange things that can affect your stacking order. I won’t get into specifics as Phillip does, but I’ll go over some tips so you won’t be surprised.
            </p>

            <h3>Natural Hierarchy Is Pretty Simple… Mostly</h3>

            <p>
                If you’re not utilizing positioning in your code, the natural stacking order is pretty simple. It’s in the same order of position in the HTML. This is also true for SVGs. It’s when you begin adding the position property to elements that the natural stacking order changes. The positioned elements will take a higher stacking order over non-positioned elements. Positioned elements with a higher defined z-index will be higher in the z-index. This, however, is not true for SVGs. SVGs don’t recognize z-index values and will always follow its self-contained natural hierarchy.
            </p>

            <h3>Stacking Context Can Either Be Your Greatest Ally Or Your Worst Foe</h3>

            <p>
                A stacking context is a stacking order inside a stacking order. That’s to say, if you have a nav element inside a header element, you can create a whole new stacking order inside the header element by merely placing a z-index value on it. Let say the header’s z-index is set to 7 and the nav is set to 2. The nav element will still appear at the 7 level because it’s a child of the header, but it will appear at the 2nd level inside it. So if you add a div and position it at <code>z-index:99</code>, it will appear higher than the nav element, but still on the 7 global stacking order.
            </p>

            <h3>Weird Things Can Affect Your Stacking Order</h3>

            <p>
                Most notably, opacity. Using the natural hierarchy, or by not defining a z-index value, opacity can mess with your z-index. Elements with an opacity value of less than 1 will appear lower in the stacking order than other elements on the same z-index with no opacity defined or opacity:1;. Despite this, there is no real discernible change in the z-index order. If you have 3 divs, two are set to z-index:5 and one of those is set to opacity: .9, there is no way to separate the two in the stacking order with the third div. It seems like the first div is 5.5, and the one with opacity: .5 is set to 5.1. There is no way to get in-between that.
            </p>

            <h3>Negative Z-Indexes Are Awesome</h3>

            <p>
                In addition to going up, you can go down! Anything with a z-index below 0 will appear beneath the natural order, positive stacking contexts notwithstanding!
            </p>

            <p>
                The only advice I have about managing z-indexes effectively is to avoid complex stacking contexts and implement a <a
                    href="http://www.smashingmagazine.com/2014/06/12/sassy-z-index-management-for-complex-layouts/"
                    target="_blank"
                    rel="noopener"
                >z-index scale</a>!
            </p>

            <h3>Transform Inheritance</h3>

            <p>
                This isn’t one that’s talked about often, but when you do encounter it, it’s pretty debilitating. Using the transform property on the parent of a position: fixed element will unfix the fixed element. Let that sink in. It will unfix it. A few months ago, I was building a sidedraw navigation. I decided to build my HTML like so:
            </p>

            <pre>
                {`<div class="track">
   <section class="side-navigation">...</section>
   <section class="main-content">...</section>
</div>`}
            </pre>

            <p>
                It’s a pretty simple set up. .track was going to be my tracking element while .main-content would exist to hold all the content normally held in a body or wrapper. .main-content would be set to 100%, while the .side-navigation would be set to 20%, then positioned: absolute and transform: translateX(-100%). This would ensure the side draw navigation would be invisible until .track had moved over 20%. I decided to use transform for .track’s animation, because of that sweet 60FPS. One problem: The hamburger button was fixed inside .main-content. Once the hamburger was clicked and the track did its thing, it’d disappear. Gone. It lost its sticky. Luckily, I was able to move the menu button outside of .track overcome this issue, but it’s weird behavior. From my testing, all transform properties seem to cause this effect.
            </p>

            <h3>Conclusion</h3>

            <p>
                And there you have it. My tips, tricks and warnings when working with three different type of inheritance and hierarchy in CSS. If you have any questions, concerns, or contributions to this article, feel free to reach out to me on <a
                    href="https://twitter.com/chdhmphry"
                    target="_blank"
                    rel="noopener"
                >twitter</a>. Thanks for reading and happy coding!
            </p>
        </article>
    )
}

export default Article
