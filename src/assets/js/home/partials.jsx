import RubyText from "@/components/RubyText.vue";
import LinkTo from "@/components/LinkTo.vue";

// General Snippets
const ruby = (body, text, rtclass) => <RubyText text={text} rtclass={rtclass}>{body}</RubyText>;
const link = (body, src, mode) => <LinkTo src={src} mode={mode}>{body}</LinkTo>;
const small = (body) => <p class="rv indent small">{body}</p>;
const hr = () => <hr class="rv" />;

// Table
const _tb_li = (name, desc, url) => <li class="rv">{link(name, url, "jump")}<span>{desc}</span></li>;
const _tb_ul = (data) => <ul>{data.map((args) => _tb_li(args.name, args.desc, args.url))}</ul>;
const table = (data) => <span class="table">{hr()}{_tb_ul(data)}{hr()}</span>;

// Timeline
const _yr_li = (date, desc) => <li class="rv yr cursor"><span class="date">{date}</span><span class="desc">{desc}</span></li>;
const _yr_ul = (meta) => <ul class="yr">{meta.map((args) => _yr_li(args.date, args.desc))}</ul>;
const _tl_li = (year, meta) => <li class="tl"><div class="rv year">{year}</div>{_yr_ul(meta)}</li>;
const _tl_ul = (items) => <ul class="tl">{items.map((args) => _tl_li(args.year, args.meta))}</ul>;
const timeline = (items) => <span class="timeline">{hr()}{_tl_ul(items)}{hr()}</span>;

// Sponsor QR Code
// const _load_img = (src) => new URL(src, import.meta.url).href;
const _img = (src) => <img class="rv" src={src} />;
const sponsor = (src1, src2) => <div class="sponsor">{_img(src1)}{_img(src2)}</div>;

// Renderer
const _line_render = (p) => p instanceof Array ? <p class="rv indent">{p}</p> : p;
const render = (data) => <>{data.body.map(_line_render)}</>;

export { ruby, link, small, hr, table, timeline, sponsor, render };
