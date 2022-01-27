console.log("Running script");

const printScrollHeight = function(){
  let currentScrollHeight = window.scrollY;
  console.log("Current scroll position: " + currentScrollHeight);
}

// Force the scroll bar to default to the BOTTOM of the page
let windowHeight = window.innerHeight;
const siteContainer = document.getElementById("site_container");
let siteHeight = siteContainer.clientHeight;
window.scroll(0, siteHeight - windowHeight);
document.addEventListener("scroll", printScrollHeight);