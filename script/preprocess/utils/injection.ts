import fs from "fs-extra";

/**
 * Get names of markdown components in the directory.
 *
 * @param dir - The directory where markdown components are stored
 * @returns Names of markdown components
 */
const getMarkdownComps = (dir: string): string[] => {
    const files = fs.readdirSync(dir);
    return files
        .filter((file) => file.endsWith(".vue"))
        .map((file) => file.replace(/\.vue$/, ""));
};

const MD_DIR = "./src/components/md";
const injections: string[] = getMarkdownComps(MD_DIR);

/**
 * Inject import statements for markdown components.
 *
 * @returns Import statements to be injected
 */
export default (): string => {
    let res: string = "";

    for (const comp of injections) {
        res += `import ${comp} from "@/components/md/${comp}.vue";\n`;
    }

    return res;
};
