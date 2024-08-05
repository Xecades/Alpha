import path from "path";
import fs from "fs";

function* walkDir(dir, filter = () => true) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            yield* walkDir(filePath, filter);
        } else if (filter(file)) {
            yield { filePath, stat };
        }
    }
}

export { walkDir };
