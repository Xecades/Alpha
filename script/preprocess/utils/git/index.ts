import { simpleGit } from "simple-git";
import type { SimpleGit } from "simple-git";

export const timeDataOf = async (file: string) => {
    const git: SimpleGit = simpleGit();
    const commits = await git.log({ file });

    if (commits.total === 0) {
        const now: string = new Date().toISOString();
        return { created: now, updated: now };
    }

    const created: string = commits.all.at(-1)!.date;
    const updated: string = commits.latest!.date;

    return { created, updated };
};
