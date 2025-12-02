import { defineVitePluginsSetup } from '@slidev/types'

export default defineVitePluginsSetup(() => {
    return [
        {
            name: 'excalidraw-svg-loader',
            transform(code, id) {
                // Handle .excalidraw files by converting them to SVG
                if (id.endsWith('.excalidraw')) {
                    // For now, return a simple SVG placeholder
                    // In production, you'd use @excalidraw/excalidraw to render
                    return {
                        code: `export default "${id.replace('.excalidraw', '.svg')}"`,
                        map: null
                    }
                }
            }
        }
    ]
})
