import { Fancybox } from "https://cdn.jsdelivr.net/npm/@fancyapps/ui@6.1/+esm";

document.addEventListener("astro:page-load", () => {
  Fancybox.bind("[data-fancybox]", { Hash: false });
});
