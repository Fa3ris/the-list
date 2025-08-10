import { defineLoader } from "vitepress"
import fs from 'node:fs'
import { transform, composeVisitors, RGBColor } from 'lightningcss';


export type Data = Record<string, Record<string, string>>

declare const data: Data
export { data }

const rgbToHex = (color: RGBColor): string => {


    const r = Math.round(color.r).toString(16).padStart(2, '0');
    const g = Math.round(color.g).toString(16).padStart(2, '0');
    const b = Math.round(color.b).toString(16).padStart(2, '0');

    // Handle alpha if it's not 1 (fully opaque)
    if (color.alpha !== undefined && color.alpha < 1) {
        const a = Math.round(color.alpha * 255).toString(16).padStart(2, '0');
        return `#${r}${g}${b}${a}`;
    }

    return `#${r}${g}${b}`;
}
export default defineLoader({
    watch: ['../theme/style.css'],
    async load(watchedFiles): Promise<Data> {

        console.log(watchedFiles)

        const content = fs.readFileSync(watchedFiles[0], "utf-8")
        console.log('content', content);

        const data: Data = {}

        transform({
            filename: watchedFiles[0],
            code: Buffer.from(content),
            visitor: {
                Rule: {
                    style(s) {
                        const selector = s.value.selectors[0][0]


                        const key = selector.type === 'class' ? selector.name : selector.type === 'pseudo-class' ? selector.kind : 'banana'

                        if (!data[key]) { data[key] = {} }

                        const holder = data[key]


                        console.group('selectors', selector.type === 'class' ? selector.name : selector.type === 'pseudo-class' ? selector.kind : 'banana')

                        for (const decl of s.value.declarations.declarations) {
                            if (decl.property !== 'custom') continue
                            if (decl.value.value[0].type !== 'color') continue
                            if (typeof decl.value.value[0].value !== 'object' || decl.value.value[0].value.type !== 'rgb') continue
                            const hex = rgbToHex(decl.value.value[0].value)
                            console.log(decl.value.value[0].value)
                            if (!decl.value.name.startsWith('--vp-c-')) continue
                            holder[decl.value.name] = hex 
                        }

                        console.groupEnd()
                    }
                },
            }
        })

        console.log('Current working directory:', process.cwd())
        console.log(data)
        return {
            'root': { boo: 'bar' },
            'dark': { bax: 'boo' }
        }
    }
})