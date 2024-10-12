import probeRemote from "probe-image-size";
import probeLocal from "image-size";
import isRelativeUrl from "is-relative-url";

export const sizeOf = async (
    src: string
): Promise<{
    height: number;
    width: number;
}> => {
    try {
        let res;
        if (!isRelativeUrl(src)) {
            res = await probeRemote(src);
        } else {
            res = probeLocal(src);
        }

        console.debug(`[Probed] ${src}`);
        return {
            height: res.height!,
            width: res.width!,
        };
    } catch {
        console.warn(`[*] Failed to fetch image size: ${src}`);
        return {
            height: 0,
            width: 0,
        };
    }
};
