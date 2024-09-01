import chokidar from "chokidar";

/**
 * When files in `watch_target` changes, call `callback`.
 *
 * @note The callback is triggered once immediately after install.
 *
 * @param watch_target - Directory to watch
 * @param callback - Callback function
 *
 * @see https://github.com/paulmillr/chokidar
 * @todo 目前存在的问题：修改本 ts 会导致注册多个 chokidar.watch
 */
export default async (watch_target: string, callback: () => Promise<void>) => {
    let is_callback_active = false;

    const guarded_callback = async () => {
        if (is_callback_active) return;

        is_callback_active = true;
        await callback();
        is_callback_active = false;
    };

    if (process.env.NODE_ENV == "development") {
        // 必须要加一个守卫，否则 build 的时候会死循环
        chokidar.watch(watch_target).on("change", guarded_callback);
    }

    await guarded_callback();
};
