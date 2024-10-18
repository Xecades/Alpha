(async () => {
    await loadCSS("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");
    await loadCSS("css/style.css");

    await loadJS("https://cdn.jsdelivr.net/npm/console.style@latest/console.style.min.js");
    await loadJS("js/init.js");
    await loadJS("js/handle.js");
    await loadJS("js/script.js");
})();
