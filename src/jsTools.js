/*
 * This function is adapted from Sachin Shah's answer at:':
 * https://stackoverflow.com/questions/52478592/how-to-animate-window-scrollto-with-javascript-not-jquery
 *
 * this function scrolls the window smoothly from the current scroll position to height b over a given number
 * of milliseconds.
 */
function scrollWindowForDuration(destination, duration, finishedCallback){
  console.log("Scrolling from " + window.scrollY + " to " + destination);
  let distance = destination - window.scrollY;
  console.log("Need to scroll: " + distance);
  let scrollStep = distance / duration;
  let scrollStepDistance = Math.abs(scrollStep);
  let scrollInterval = setInterval(function(){
    console.log("current scroll position: " + window.scrollY);
    console.log("destination: " + destination);
    console.log("Math.abs(window.scrollY - destination): " + Math.abs(window.scrollY-destination));
    console.log("scrollStepDistance(abs(scrollStep)): " + scrollStepDistance);
    if(Math.abs(window.scrollY - destination) >  scrollStepDistance){
      console.log("Scrolling " + scrollStep);
      window.scrollBy(0, scrollStep);
    } else {
      console.log("Arriving at destination");
      window.scrollTo(window.scrollX, destination);
      clearInterval(scrollInterval);
      finishedCallback();
    }
  })
}