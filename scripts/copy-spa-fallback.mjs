import { copyFileSync, existsSync } from "node:fs"

const source = "build/client/__spa-fallback.html"
const destination = "build/client/404.html"

if (!existsSync(source)) {
    console.error(
        `Missing ${source}. Prerender / so React Router writes the SPA fallback there.`,
    )
    process.exit(1)
}

copyFileSync(source, destination)
