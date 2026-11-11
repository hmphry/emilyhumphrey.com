/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SITE_ORIGIN?: string
}

declare module "*.svg?react" {
    import * as React from "react"
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    export default ReactComponent
}
