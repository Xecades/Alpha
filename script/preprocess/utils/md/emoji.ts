import * as Emoji from "node-emoji";

/**
 * Get emoji by name.
 *
 * @param name - Name of the emoji
 * @returns The emoji
 *
 * @see https://github.com/omnidan/node-emoji
 */
export default (name: string): string => {
    const res = Emoji.get(name);

    if (res === undefined) {
        throw new Error(`Invalid emoji: ${name}`);
    }
    return res;
};
