import { simpleGit, SimpleGit } from "simple-git";

export const timeDataOf = async (file: string) => {
    const git: SimpleGit = simpleGit();
    const commits = await git.log({ file });

    const created = new Date(commits.all.at(-1)!.date);
    const updated = new Date(commits.latest!.date);

    return { created, updated };
};
