import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";

const compiler: NodeCompiler = NodeCompiler.create();

/**
 * Compile Typst code to SVG.
 *
 * @param code - Typst code
 * @returns SVG document
 *
 * @see https://myriad-dreamin.github.io/typst.ts/cookery/guide/all-in-one-node.html
 */
export default (code: string): string => {
    compiler.evictCache(10);

    code = `#set page(width: auto, height: auto, margin: 5pt)\n#set text(size: 16pt)\n${code}`;

    const svg = compiler.svg({
        mainFileContent: code,
    });

    return svg;
};
