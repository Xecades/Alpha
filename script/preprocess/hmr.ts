/**
 * Handle hot update
 * @see https://github.com/paulmillr/chokidar
 */
import chokidar from "chokidar";

// 目前存在的问题：修改本 js 会导致注册多个 chokidar.watch
export default async (watch_dir, fn) => {
    let cb_active = false;
    const chokidar_cb = async () => {
        if (cb_active) return;

        cb_active = true;
        await fn();
        cb_active = false;
    };

    if (process.env.NODE_ENV == "development") {
        // 必须要加一个守卫，否则 build 的时候会死循环
        chokidar.watch(watch_dir).on("change", chokidar_cb);
    }

    await chokidar_cb();
};
