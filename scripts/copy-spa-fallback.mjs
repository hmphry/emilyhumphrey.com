import { copyFileSync, existsSync, readFileSync } from "node:fs"

const source = "build/client/__spa-fallback.html"
const destination = "build/client/404.html"
const domain = "emilyhumphrey.com"
const builtCname = "build/client/CNAME"
const rootCname = "CNAME"

if (!existsSync(source)) {
    console.error(
        `Missing ${source}. Prerender / so React Router writes the SPA fallback there.`,
    )
    process.exit(1)
}

copyFileSync(source, destination)

const publishedDomain = existsSync(builtCname)
    ? readFileSync(builtCname, "utf8").trim()
    : ""

if (publishedDomain !== domain) {
    console.error(
        `Expected ${builtCname} to contain ${domain}. Add public/CNAME so Vite copies it into the client build.`,
    )
    process.exit(1)
}

if (existsSync(rootCname)) {
    const rootDomain = readFileSync(rootCname, "utf8").trim()
    if (rootDomain !== domain) {
        console.error(
            `Repo-root CNAME contains ${JSON.stringify(rootDomain)}, expected ${domain}. public/CNAME is the file that is published.`,
        )
        process.exit(1)
    }
}
