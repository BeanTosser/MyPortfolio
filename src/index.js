console.log("Running script");

let windowHeight = window.innerHeight;
const siteContainer = document.getElementById("site_container");
let siteHeight = siteContainer.clientHeight;
console.log("siteHeight: " + siteHeight);
console.log("windowHeight: " + windowHeight);
window.scroll(0, siteHeight - windowHeight);
console.log("scrolled to: " + (siteHeight - windowHeight));