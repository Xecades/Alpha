import fs from "fs-extra";
import type { FMAttr, ParsedData } from "./parse-md";
import type { Header } from "../toc";

export default async (data: ParsedData[], dist: string) => {
    let cache: Record<string, { attr: FMAttr; toc: Header[] }> = {};

    for (const item of data) {
        cache[item.pathname] = {
            attr: item.attr,
            toc: item.toc,
        };
    }

    await fs.outputJSON(dist, cache);
};
