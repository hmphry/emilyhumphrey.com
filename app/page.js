import LinkButton from "@/components/LinkButton";
import { FaGithub, FaLinkedin  } from "react-icons/fa";
import { FaPaintbrush , FaBook, FaCode, FaGithubAlt, FaCodepen,FaXTwitter, FaBluesky  } from "react-icons/fa6";
import { PiGithubLogoFill } from "react-icons/pi";
import { RiContactsBook3Fill } from "react-icons/ri";

export default function Home() {
  return (
        <div className="grid grid-cols-1 container max-w-xl mx-auto px-4 py-8 gap-8">
        <div>
            <h1 className="text-2xl text-content font-bold">Emily Humphrey</h1>
            <h2 className="text-lg text-content">Full Stack Engineer</h2>
        </div>
        <p>Hi, I'm Emily. I'm a Full Stack Engineer with 15+ years of experience building fast, accessible, secure, and scalable web applications. I focus on clean architecture, performance, and maintainability—bridging the gap between design and engineering with clarity and care.</p>
        <ul className="grid grid-cols-1 gap-4">
            <li><LinkButton text="Save Contact" href="/emilyhumphrey.vcf" Icon={RiContactsBook3Fill} download /></li>
            <li><LinkButton text="Linked In" href="https://www.linkedin.com/in/heyhmphry/" Icon={FaLinkedin} /></li>
            <li><LinkButton text="Github" href="https://github.com/hmphry" Icon={FaGithubAlt} /></li>
            <li><LinkButton text="Blog" href="https://hmphry.com" Icon={FaCode} /></li>
            <li><LinkButton text="BlueSky" href="https://bsky.app/profile/hmphry.com" Icon={FaBluesky} /></li>
            <li><LinkButton text="Codepen" href="https://codepen.io/hmphry" Icon={FaCodepen} /></li>
            {/* <li><LinkButton text="Portfolio" href="/" Icon={FaPaintbrush } /></li> */}
            {/* <li><LinkButton text="Compendium" href="/" Icon={FaBook} /></li> */}
        </ul>
            </div>
  );
}
