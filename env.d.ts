/// <reference types="vite/client" />

declare module "*.vue" {
    import { ComponentOptions } from "vue";

    const componentOptions: ComponentOptions;
    export default componentOptions;
}

/** @see https://github.com/Akryum/vue-virtual-scroller/issues/199 */
declare module "vue-virtual-scroller" {
    import type {
        ComponentOptionsMixin,
        ComponentPropsOptions,
        ComputedOptions,
        DefineComponent,
        MethodOptions,
    } from "vue";

    type ArrayElement<ArrayType extends readonly unknown[]> =
        ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

    type RecycleScrollerProps = {
        items: any[];
        direction?: "vertical" | "horizontal";
        itemSize?: number | null;
        gridItems?: number;
        itemSecondarySize?: number;
        minItemSize?: number;
        sizeField?: string;
        typeField?: string;
        keyField?: string;
        pageMode?: boolean;
        prerender?: number;
        buffer?: number;
        emitUpdate?: boolean;
        updateInterval?: number;
        listClass?: string;
        itemClass?: string;
        listTag?: string;
        itemTag?: string;
    };

    type RecycleScrollerEmits =
        | "resize"
        | "visible"
        | "hidden"
        | "update"
        | "scroll-start"
        | "scroll-end";

    type RecycleScrollerEmitFunctions = {
        resize: () => void;
        visible: () => void;
        hidden: () => void;
        update: (
            tartIndex: number,
            endIndex: number,
            visibleStartIndex: number,
            visibleEndIndex: number
        ) => void;
        "scroll-start": () => void;
        "scroll-end": () => void;
    };

    type RecycleScrollerSlotProps = {
        item: ArrayElement<RecycleScrollerProps["items"]>;
        index: number;
        active: boolean;
    };

    type RecycleScrollerSlots = {
        default: (slotProps: any) => VNode[];
        before: () => VNode[];
        empty: () => VNode[];
        after: () => VNode[];
    };

    interface RecycleScrollerPublicMethods extends MethodOptions {
        getScroll(): { start: number; end: number };
        scrollToItem(index: number): void;
        scrollToPosition(position: number);
    }

    export const RecycleScroller: DefineComponent<
        ComponentPropsOptions<RecycleScrollerProps>,
        object,
        object,
        ComputedOptions,
        RecycleScrollerPublicMethods,
        ComponentOptionsMixin,
        ComponentOptionsMixin,
        RecycleScrollerEmitFunctions,
        RecycleScrollerEmits,
        RecycleScrollerProps
    >;

    export const DynamicScroller: RecycleScroller;

    type DynamicScrollerItemProps = {
        item: any;
        active: boolean;
        sizeDependencies?: any[];
        watchData?: boolean;
        tag?: string;
        emitResize?: boolean;
        onResize: () => void;
    };

    type DynamicScrollerItemEmits = "resize";

    export const DynamicScrollerItem: DefineComponent<
        ComponentPropsOptions<DynamicScrollerItemProps>,
        object,
        object,
        ComputedOptions,
        MethodOptions,
        ComponentOptionsMixin,
        ComponentOptionsMixin,
        DynamicScrollerItemEmits[],
        DynamicScrollerItemEmits,
        DynamicScrollerItemProps
    >;
}

declare module "@cache/*/routes" {
    import { RouteRecordRaw } from "vue-router";

    const routes: RouteRecordRaw[];
    export default routes;
}

declare module "@cache/*/search" {
    import { FuseResult } from "fuse.js";
    import { SearchTarget } from "./script/preprocess/types";

    const search: (
        query: string
    ) => SearchTarget[] | FuseResult<SearchTarget>[];

    export default search;
}

declare module "@cache/*/meta" {
    import { CacheMeta } from "./script/preprocess/types";

    const meta: CacheMeta;
    export default meta;
}

declare module "@cache/*/config" {
    import { Config } from "./script/preprocess/types";

    const config: Config;
    export default config;
}
