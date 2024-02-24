customElements.define('github-embed', class extends HTMLElement {
    connectedCallback() {
        this.source = "https://github.com/embed-github/embed-github.github.io/blob/main/element.js";
        this.createElement = (tag, props = {}) => Object.assign(document.createElement(tag), props);
        this.id = "id" + crypto.randomUUID();
        let onoff = x => this.hasAttribute("no" + x) ? "off" : "on";
        let container = "script";
        let uri = "https://emgithub.com/embed-v2.js";
        let src = "?target=" + encodeURI(this.getAttribute("src") || this.source) +
            "&style=" + (this.getAttribute("style") || "devibeans") +
            "&type=" + (this.getAttribute("type") || "code") +
            "&showBorder=" + onoff("border") +
            "&showLineNumbers=" + onoff("linenumbers") +
            "&showFileMeta=" + onoff("meta") +
            "&showFullPath=" + onoff("path") +
            "&showCopy=" + onoff("copy");
        let properties = {};
        if (this.hasAttribute("iframe")) {
            container = "iframe";
            uri = "https://emgithub.com/iframe.html";
            properties = {
                frameborder: 0,
                scrolling: "no",
                style: "width:100%; height:1500px;",
                allow: "clipboard-write"
            };
        }
        this.append(
            this.createElement("style", {
                innerHTML:
                    "#" + this.id + " .file-meta{opacity:.7}" +
                    "#" + this.id + " .file-meta:hover{opacity:1}" +
                    "#" + this.id + " a:hover{color:cornflowerblue}"
            }),
            this.createElement(container, {
                src: uri + src,
                ...properties,
                onload: () => this.scriptload(),
            }),// container
        ); // append
    }
    scriptload() {
        this.querySelector(".file-meta").append(
            " and ",
            this.createElement("a", {
                href: this.source,
                target: "_blank",
                innerHTML: "&lt;" + this.nodeName + "&gt; Web Component"
            })
        );// append
        console.log("script loaded", this.querySelectorAll("style"));
    }
});