import { simpleGit } from "simple-git";
import type { SimpleGit } from "simple-git";

export const timeDataOf = async (file: string) => {
    const git: SimpleGit = simpleGit();
    const commits = await git.log({ file });

    const created: Date = new Date(commits.all.at(-1)!.date);
    const updated: Date = new Date(commits.latest!.date);

    return { created, updated };
};
