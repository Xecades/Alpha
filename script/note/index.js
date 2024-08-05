import { walkDir } from "../utils.js";

const NoteDir = "./note";

(() => {
    const md_filter = (x) => x.endsWith(".md");
    const walker = walkDir(NoteDir, md_filter);
    for (const { filePath: file, stat } of walker) {
        console.log(file);
    }
})();
