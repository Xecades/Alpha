function loadJS(url) {
    return new Promise(resolve => {
        let script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        document.getElementsByTagName("body")[0].appendChild(script);
    });
}

function loadCSS(url) {
    return new Promise(resolve => {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = url;
        link.onload = resolve;
        document.getElementsByTagName("head")[0].appendChild(link);
    });
}