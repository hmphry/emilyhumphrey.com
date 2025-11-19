function Article() {
    return (
        <article className="article">
            <h2>Reddit NFL and Sass Maps</h2>
            <p className="eyebrow">Originally Published on August 25th, 2014</p>
            <h3>Backstory</h3>
            <p>
                I’ve been recently diving into refactoring the code of r/NFL,
                Reddit’s NFL community. The code is about two years old now, and
                as you would guess, coding to customize Reddit is not a clean
                process. Reddit uses markdown to insert custom content, so we’re
                not allowed to use IDs, classes, or any HTML identifying
                attributes other than titles. I like to use titles for simple
                things and creating a unique identifying sequence with Header
                for complex elements(46 = h2+h6+custom content). This, plus wear
                and tear from updating and adding “features,” not too mention a
                specific mod plugin that likes to expand and format the
                subreddit’s CSS automatically, has left the code base a bit
                unmanageable. To make matters worse, we’ve hit the 100kb cap
                limit, so no more additions until we clean up.
            </p>
            <p>
                So, we decided to rebuild. We’re coding the new theme in SASS
                and markdown, using Gulp.js to compile the files into
                Reddit-usable code. You can track and contribute to the project
                on{" "}
                <a
                    href="https://www.reddit.com/r/nfldev/"
                    target="_blank"
                    rel="noopener"
                >
                    Reddit
                </a>{" "}
                or{" "}
                <a
                    href="https://github.com/redditnfl/front-end"
                    target="_blank"
                    rel="noopener"
                >
                    Github
                </a>
                .
            </p>

            <h3>The Problem</h3>
            <p>
                I knew we’d encounter some issues, and one of them would be the
                NFL team associated data. For those that do not know, the NFL
                has 32 teams. Users of r/NFL are allowed to select one of these
                teams to mark their profiles. This is called “flair” on Reddit.
                A user’s flair is shown next to their username on every comment
                made within r/NFL. Users can also insert these logos into
                comments, by either using a team’s call sign(I.E. NYG = Giants,
                CHI = Bears), or by linking to that team’s subreddit, which are
                not always the same as the team’s name(I.E.{" "}
                <a
                    href="https://old.reddit.com/r/nygiants/"
                    target="_blank"
                    rel="noopener"
                >
                    /r/nygiants
                </a>
                ,{" "}
                <a
                    href="https://old.reddit.com/r/falcons/"
                    target="_blank"
                    rel="noopener"
                >
                    /r/falcons
                </a>
                ). All in all, each team has three unique identifiers, totaling
                96 selectors in our CSS. However, many of these styles are
                repeatable. Subreddit links and call signs are the same size and
                use the same sprite sheet, as user flair. There is just a change
                in the background position. Previously to SASS maps, the only
                way to accomplish this section would be to either hardcode
                everything, using objects and the “nth” function, or code three
                different loops, bloating the code base out three times the
                size!
            </p>

            <h3>Enter Our Hero, The SASS Map</h3>
            <p>
                SASS Maps were introduced in Sass 3.3 – Maptastic Maple. They
                allow you to assign object data “keys”. Without SASS maps, you
                could handle objects like this $animals: (Lion Panthera
                Felidae), (Wolf, Canis, Canidae);, then break them out with
                SASS’ “nth” function, as mentioned above. This isn’t very
                intuitive, and can lead to confusion later down the road. With
                Maps, the example would look something like this: $animals:
                (name:Lion, genus:Panthera, family:Felidae), (name:Wolf,
                genus:Canis, family:Canidae);. Initially, there is a lot more to
                type, but this way leaves much of the guess work out when using
                this code. Here is example used in a loop:
            </p>
            <pre>
                {`
@each $animal in $animals{
	// Get animal's name
	$name: nth($animal, 1);
	// Get animal's genus
	$genus: nth($animal, 2);
	// Get animal's family
	$family: nth($animal, 3);
	.#{$name}:after{
		content: "#{$name} belong to the #{$genus} genus of the #{$family} family.";
	}
}
                `}
            </pre>
            <p>
                Simple enough. However, what if you wanted to add a “tribe” key
                after the genus, or a descriptor like “Large” or “Grey” before
                the name? You’ll have to either remap all the objects then the
                variables in every each loop, or code out of hierarchy. It’s not
                very maintainable. Using a Map, the code would look like this:
            </p>
            <pre>
                {`@each $animal in $animals{
	// Get animal's name
	$name: map-get($animal, name);
	// Get animal's genus
	$genus: map-get($animal, genus);
	// Get animal's family
	$family: map-get($animal, family);
	.#{$name}:after{
		content: "#{$name} belong to the #{$genus} genus of the #{$family} family.";
	}
}`}
            </pre>
            <p>
                There is some repeating, but this code is a lot more
                maintainable. If you need to add a new key, you simply set it
                and be done.
            </p>

            <h3>The Solution</h3>
            <p>
                By using SASS maps, our solution is cleaner and more readable.
                We’re going to define a variable called $nfl-teams and map 32
                objects with name, abbr, and url. Warning: very long code
                incoming. We’re storing each team on a new line, in case an
                event where we have to change it.
            </p>
            <pre>
                {`$nfl-teams:
	(name:cardinals, abbr:ARI, url:azcardinals),
	(name:falcons, abbr:ATL, url:falcons),
	(name:ravens, abbr:BAL, url:ravens),
	(name:bills, abbr:BUF, url:buffalobills),
	(name:panthers, abbr:CAR, url:panthers),
	(name:bears, abbr:CHI, url:chibears),
	(name:bengals, abbr:CIN, url:bengals),
	(name:browns, abbr:CLE, url:browns),
	(name:cowboys, abbr:DAL, url:cowboys),
	(name:broncos, abbr:DEN, url:denverbroncos),
	(name:lions, abbr:DET, url:detroitlions),
	(name:packers, abbr:GB, url:greenbaypackers),
	(name:texans, abbr:HOU, url:texans),
	(name:colts, abbr:IND, url:colts),
	(name:jaguars, abbr:JAX, url:jaguars),
	(name:chiefs, abbr:KC, url:kansascitychiefs),
	(name:dolphins, abbr:MIA, url:miamidolphins),
	(name:vikings, abbr:MIN, url:minnesotavikings),
	(name:patriots, abbr:NE, url:patriots),
	(name:saints, abbr:NO, url:saints),
	(name:giants, abbr:NYG, url:nygiants),
	(name:jets, abbr:NYJ, url:nyjets),
	(name:raiders, abbr:OAK, url:oaklandraiders),
	(name:eagles, abbr:PHI, url:eagles),
	(name:steelers, abbr:PIT, url:steelers),
	(name:chargers, abbr:SD, url:chargers),
	(name:49ers, abbr:SF, url:49ers),
	(name:seahawks, abbr:SEA, url:seahawks),
	(name:rams, abbr:STL, url:stlouisrams),
	(name:buccaneers, abbr:TB, url:buccaneers),
	(name:titans, abbr:TEN, url:tennesseetitans),
	(name:redskins, abbr:WAS, url:redskins);`}
            </pre>
            <p>
                Now, we’re going to to create just one loop to create the code
                we need:
            </p>
            <pre>
                {`$pos-20: 0;
@each $team in $nfl-teams {
	// Get team name
	$name: map-get($team, name);
	// Get team abbr
	$abbr: map-get($team, abbr);
	// Get team url
	$url: map-get($team, url);
	.flair-#{$thisName}:before,
	a[href$="/r/#{$thisUrl}"]:before,
	a[href$="/#{$thisAbbr}"]:before{
		background-position: 0 rem($pos-20);
	}
	// Count down for bg position
	$pos-20: $pos-20 - 20px;
}`}
            </pre>
            <p>
                You don’t have to define each as a variable. I did in this case
                because I am using them as selector, but you can simply use the
                get-map() function if they’re values. The final product looks
                something like this, but repeated 31 times:
            </p>
            <pre>
                {`.flair-giants:before,
a[href$="/r/nygiants"]:before,
a[href$="/NYG"]:before {
	background-position: 0 -25rem;
}`}
            </pre>

            <h3>Conclusion</h3>
            <p>
                Sass maps are useful to keep your code organized and precise. If
                you have any questions, or a way to improve this, feel free to
                tweet, comment below, or open a github issue for r/nfl. Finally,
                Let’s go Giants and thanks for reading!
            </p>
        </article>
    )
}

export default Article
