let found = false;
new MutationObserver(() => {
    if (found)  {
        return;
    }

    if (!document.querySelector("#streamingQuality a")) {
        return;
    }

    found = true;

    const partId = window.location.search.match(/partId=(.*)\&?/)[1];
    const btn = document.createElement("div");
    btn.setAttribute("id", "openDirect");
    btn.innerText = "そのまま視聴";
    btn.addEventListener("click", () => {
        window.location.href = `https://anime.dmkt-sp.jp/animestore/sc_d_pc?partId=${partId}`;
        return false;
    });
    document.querySelector(".playerContainer div .list").appendChild(btn);
}).observe(document.querySelector("body"), {
    childList: true,
    subtree: true,
});
