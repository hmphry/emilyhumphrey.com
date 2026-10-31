function Article() {
    return (
        <article className="article">
            <h2>Barebones</h2>

            <p className="eyebrow">Originally Published on November 16th, 2019</p>

            <p>
                I wanted to introduce a tool I use daily. I call it barebones. It’s a simple, flexible grid system maker, built on the bones of 960.gs and other heritage grid systems.
            </p>

            <h3>What is a Grid System?</h3>

            <p>
                A grid system’s charge is creating uniformity among the site’s structure. Grid systems usually do this with rows and columns, but there are more abstract grids systems available. Some grids even dictate vertical space, but in my opinion, it’s best to let the content dictate that.
            </p>

            <p>
                Grid systems gained popularity around the mid-aughts when divs surpassed tables as the preferred web page structure. They were excellent at translating a design to the web. Since the rise of responsive design, I feel grid systems only became increasingly essential. Managing horizontal space between multiple states can make CSS complex and harder to understand. Off shifting this to an automated makes sense from a maintainability point.
            </p>

            <h3>What is Barebones?</h3>

            <p>
                Barebones is a small SCSS Mixin that makes grids. Any number of grids, with any number of columns at any breakpoint! It’s 100% flexible to your needs. A basic usage of a grid is 4 columns on mobile, 8 columns on tablet, and 12 columns on laptop and above. Here is what that set up would look like:
            </p>

            <pre>
                {`$barebones:
	namespace: "bones",
	box-sizing: "border",
	layouts: ((
		name: mobile,
		prefix: m,
		start: false,
		end: 760px,
		columns: 4,
		gutter: 0,
		padding: 0
	), (
		name: tablet,
		prefix: t,
		start: 761px,
		end: 1120px,
		columns: 12,
		gutter: 0,
		padding: 0
	), (
		name: laptop,
		prefix: d,
		start: 1121px,
		end: false,
		columns: 12,
		gutter: 0,
		padding: 0
	));`}
            </pre>

            <p>
                With this system, an element that’ll span 4 columns on mobile, 6 columns on tablet and 8 columns on desktop would be written as:
            </p>

            <pre>
                {`<div class="grid">
    <div class="bones-m-4 bones-t-6 bones-d-8">
        ...
    </div>
</div>`}
            </pre>

            <p>
                To see more examples, check out <a
                    href="https://github.com/hmphry/barebones.scss"
                    target="_blank"
                    rel="noopener"
                >barebones on github</a>.
            </p>
        </article>
    )
}

export default Article
