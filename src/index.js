console.log("Running script");

let windowHeight = window.innerHeight;
const siteContainer = document.getElementById("site_container");
const siteHeight = 10000;

siteContainer.style = siteContainer.style + "height: " + siteHeight.toString() + "px";

window.scroll(0, siteHeight - windowHeight);