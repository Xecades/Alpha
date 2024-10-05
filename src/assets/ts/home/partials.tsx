import RubyText from "@/components/RubyText.vue";
import LinkTo from "@/components/LinkTo.vue";
import type { JSX } from "vue/jsx-runtime";
import type { HomeLayoutData } from "@/layout/home.vue";

export type Element = JSX.Element | string;

// General Snippets
export const hr = () => <hr class="rv" />;
export const small = (body: Element) => <p class="rv indent small">{body}</p>;
export const ruby = (body: Element, text: string, rtclass?: string) => (
    <RubyText text={text} rtclass={rtclass}>
        {body}
    </RubyText>
);

export const link = (
    body: Element,
    src: string | (() => void),
    mode?: "stay" | "jump"
) => (
    <LinkTo src={src} mode={mode}>
        {body}
    </LinkTo>
);

// Table
export type TableItem = {
    name: Element;
    desc: Element;
    url: string | (() => void);
};

export const table = (data: TableItem[]) => {
    const li = (args: TableItem) => (
        <li class="rv">
            {link(args.name, args.url, "jump")}
            <span>{args.desc}</span>
        </li>
    );

    return (
        <span class="table">
            {hr()}
            <ul>{data.map(li)}</ul>
            {hr()}
        </span>
    );
};

// Timeline
export type TimelineItem = {
    year: number;
    meta: { date: string; desc: string }[];
};

export const timeline = (items: TimelineItem[]) => {
    const year_li = (meta: TimelineItem["meta"][0]) => (
        <li class="rv yr cursor">
            <span class="date">{meta.date}</span>
            <span class="desc">{meta.desc}</span>
        </li>
    );

    const li = (args: TimelineItem) => (
        <li class="tl">
            <div class="rv year">{args.year}</div>
            <ul class="yr">{args.meta.map(year_li)}</ul>
        </li>
    );

    return (
        <span class="timeline">
            {hr()}
            <ul class="tl">{items.map(li)}</ul>
            {hr()}
        </span>
    );
};

// Sponsor QR Code
export const sponsor = (src1: string, src2: string) => {
    const img = (src: string) => <img class="rv" src={src} />;

    return (
        <div class="sponsor">
            {img(src1)}
            {img(src2)}
        </div>
    );
};

// Renderer
export const render = (data: HomeLayoutData) => (
    <>
        {data.body.map((p) =>
            p instanceof Array ? <p class="rv indent">{p}</p> : p
        )}
    </>
);
