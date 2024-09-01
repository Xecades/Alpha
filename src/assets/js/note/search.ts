import _search_untyped from "@cache/note/search";
const search_internal = _search_untyped as CacheSearch;

import type { FuseResult, FuseResultMatch, RangeTuple } from "fuse.js";
import type { CacheSearch, SearchTarget } from "script/preprocess/types";

/** Search results. */
export type Result = {
    /** Highlight area */
    type?: "title" | "content";

    /** Text before highlight */
    before?: string;

    /** Highlight text */
    mark?: string;

    /** Text after highlight */
    after?: string;
} & SearchTarget;

/** Maximum characters before highlight */
const BEFORE_CNT: number = 10;

/**
 * Search and return parsed results.
 *
 * @param query - Search query
 * @returns Parsed search results
 */
export const search = async (query: string): Promise<Result[]> => {
    const range = (i: RangeTuple): number => i[1] - i[0];
    const longest = (indices: readonly RangeTuple[]): RangeTuple =>
        indices.reduce((acc, cur) => (range(cur) > range(acc) ? cur : acc));

    let searchResults: FuseResult<SearchTarget>[] | Result[] =
        search_internal(query);
    let results: Result[] = [];

    if (query !== "") {
        for (let res of searchResults as FuseResult<SearchTarget>[]) {
            let match = (res.matches as FuseResultMatch[])[0];

            // Always highlights the longest match
            let [s, e] = longest(match.indices);

            let type = match.key as "title" | "content";
            let text = match.value as string;

            let before = "",
                mark = "",
                after = "";

            if (type === "content") {
                if (s - BEFORE_CNT > 0) {
                    before = "..." + text.slice(s - BEFORE_CNT, s).trimStart();
                } else {
                    before = text.slice(0, s);
                }

                mark = text.slice(s, e + 1);
                after = text.slice(e + 1);
            } else if (type === "title") {
                before = text.slice(0, s);
                mark = text.slice(s, e + 1);
                after = text.slice(e + 1);
            }

            results.push({
                ...res.item,
                type,
                before,
                mark,
                after,
            });
        }
    } else {
        // if query is empty, show all posts
        results = searchResults as Result[];
    }

    return results;
};
