function Article() {
    return (
        <article className="article">
            <h2>Reddit NFL</h2>

            <p className="eyebrow">Originally Published on March 12th, 2023</p>

            <p>
                It was back in 2012 when I joined the Reddit NFL team, armed with enthusiasm and a desire to contribute. I knew there was room for improvement, and I set out to brainstorm how we could make the subreddit even better. One of our key focuses was enhancing the user experience, making it more intuitive and welcoming for everyone.
            </p>

            <p>
                We also created a unique brand, aiming to be taken more seriously. To foster a greater sense of community, we organized special events with unique themes that brought fans together, amplifying the excitement and camaraderie. Our revamped subreddit was soon noticed by Reddit’s COO at the time, Erik Martin, and he recognized the effort with the “CSS Animal” award. It was a proud moment for the team.
            </p>

            <p>
                It involved collaboration from the entire team, and I’m grateful for the opportunity to have cultivated a subreddit that millions of NFL fans consider their online football sanctuary.
            </p>

            <p>
                <img src="http://hmphry.com/wp-content/uploads/2023/09/crown.png" alt="" />
            </p>

            <h3>The Crown</h3>

            <p>
                The closest element we had to a logo was what we called “The Crown”. The Crown was used as the central visual element of the site and used in the global navigation. Eventually, we began using it in all applications. For The Crown, we knew we wanted something that felt quintessentially “NFL”, but with a modern twist. Our guiding principle was to keep the lines straight and avoid any curves, giving it a bold and powerful look.
            </p>

            <h3>The Code</h3>

            <p>
                Reddit’s customization tool has its limitations, as it only offers a basic version of markdown and CSS, and places a cap on image uploads at 50. However, in 2014, I sought to enhance the process by introducing Gulp.JS and SCSS into our code base. These tools enabled us to develop a more robust theme and created a user experience not-possible otherwise
            </p>

            <p>
                I am quite proud of this code base and it’s longevity. After stepping away from the project in 2020 due to dwindling interest in the NFL, it has been taken over and maintained by other developers and is still in use and beloved by the fan base, nearly a decade after launch.
            </p>

            <p>
                <a
                    href="https://github.com/redditnfl/front-end"
                    target="_blank"
                    rel="noopener"
                >View the open source code base</a>
            </p>
        </article>
    )
}

export default Article
