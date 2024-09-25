import walkSync from "walk-sync";

/**
 * Traverse a directory synchronously.
 *
 * @param src - Source directory
 * @returns Traverse results
 *
 * @see https://www.npmjs.com/package/walk-sync
 */
export default (src: string): string[] => {
    return walkSync(src, {
        directories: false,
        globs: ["**/*.md"],
        includeBasePath: true,
    });
};
