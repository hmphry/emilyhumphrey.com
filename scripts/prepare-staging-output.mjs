import {
    cpSync,
    existsSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from "node:fs"
import path from "node:path"

const productionOrigin = "https://emilyhumphrey.com"
const stagingOrigin = process.env.VITE_SITE_ORIGIN
const sourceDir = "build/client"
const outputDir = "build/staging-site"
const legacyRedirect = path.join(
    "articles",
    "accessibility-reviews-ai-generated-components",
    "index.html",
)
const socialArticle = path.join(
    "articles",
    "accessibility-review-for-ai-generated-ui",
    "index.html",
)
const legacyArticlePath = "/articles/accessibility-review-for-ai-generated-ui/"

if (!stagingOrigin || stagingOrigin === productionOrigin) {
    console.error(
        "VITE_SITE_ORIGIN must be the staging origin, not the production origin.",
    )
    process.exit(1)
}

if (!existsSync(path.join(sourceDir, "index.html"))) {
    console.error(
        `Missing ${sourceDir}/index.html. Run npm run build before preparing staging output.`,
    )
    process.exit(1)
}

rmSync(outputDir, { recursive: true, force: true })
cpSync(sourceDir, outputDir, { recursive: true })

const cname = path.join(outputDir, "CNAME")
if (!existsSync(cname)) {
    console.error(
        `Expected ${cname} in the production-shaped build so staging can drop it deliberately.`,
    )
    process.exit(1)
}
rmSync(cname)

writeFileSync(
    path.join(outputDir, "robots.txt"),
    ["User-agent: *", "Disallow: /", ""].join("\n"),
)

writeFileSync(path.join(outputDir, ".htaccess"), htaccess())
rewriteLegacyRedirect(path.join(outputDir, legacyRedirect))
assertStagingArticle(path.join(outputDir, socialArticle), stagingOrigin)

console.log(`Staging output: ${outputDir}`)
console.log("Docroot index: index.html (Apache DirectoryIndex)")
console.log("Excluded from upload: CNAME")

function rewriteLegacyRedirect(file) {
    if (!existsSync(file)) {
        console.error(`Missing legacy redirect ${file}`)
        process.exit(1)
    }

    const productionUrl = `${productionOrigin}${legacyArticlePath}`
    let html = readFileSync(file, "utf8")
    const refreshFrom = `content="0; url=${productionUrl}"`
    const refreshTo = `content="0; url=${legacyArticlePath}"`

    if (!html.includes(refreshFrom)) {
        console.error(`Legacy redirect is missing ${refreshFrom}`)
        process.exit(1)
    }

    html = html.replace(refreshFrom, refreshTo)

    const href = `href="${productionUrl}"`
    const firstHref = html.indexOf(href)
    const secondHref = html.indexOf(href, firstHref + href.length)
    if (firstHref === -1 || secondHref === -1) {
        console.error(
            "Legacy redirect should keep one absolute canonical href and one absolute anchor href.",
        )
        process.exit(1)
    }

    html =
        html.slice(0, secondHref) +
        `href="${legacyArticlePath}"` +
        html.slice(secondHref + href.length)

    if (
        html.includes(`url=${productionOrigin}`) ||
        html.indexOf(href) !== firstHref
    ) {
        console.error("Legacy redirect still sends visitors to production.")
        process.exit(1)
    }

    writeFileSync(file, html)
}

function assertStagingArticle(file, origin) {
    if (!existsSync(file)) {
        console.error(`Missing prerendered article ${file}`)
        process.exit(1)
    }

    const html = readFileSync(file, "utf8")
    if (!html.includes(`${origin}/`)) {
        console.error(
            `${file} has no ${origin} URL. The staging build did not apply VITE_SITE_ORIGIN.`,
        )
        process.exit(1)
    }

    if (html.includes(productionOrigin)) {
        console.error(
            `${file} still contains ${productionOrigin}. Refusing to publish production absolute URLs.`,
        )
        process.exit(1)
    }
}

function htaccess() {
    return `# Staging only. Production GitHub Pages publishes build/client and does not use this file.
# React Router prerenders each route to a directory index.html, including /.
# DirectoryIndex serves those files on Apache. A leftover index.php in the
# account would otherwise win. Unknown paths are not rewritten to 404.html;
# every article and essay route is prerendered.
Options -MultiViews
DirectoryIndex index.html

<IfModule mod_mime.c>
  AddType application/javascript .js .mjs
  AddType text/css .css
  AddType image/svg+xml .svg .svgz
  AddType font/woff2 .woff2
  AddType font/woff .woff
  AddType font/ttf .ttf
</IfModule>

<IfModule mod_headers.c>
  Header set X-Robots-Tag "noindex, nofollow"
  <FilesMatch "\\.(html|txt)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<Files ".ftp-deploy-sync-state.json">
  Require all denied
</Files>
`
}
