/*
 * This function is adapted from Sachin Shah's answer at:':
 * https://stackoverflow.com/questions/52478592/how-to-animate-window-scrollto-with-javascript-not-jquery
 *
 * this function scrolls the window smoothly from the current scroll position to height b over a given number
 * of milliseconds.
 */
function scrollWindowForDuration(destinationScalar, duration, finishedCallback){
  console.log("destination scalar: " + destinationScalar);
  // NOTE - destinationScalar is RELATIVE to the starting scroll position, because element client rect coordinates are relative to the CURRENT viewport.
  let scrollStep = destinationScalar / duration;
  let scrollStepDistance = Math.abs(scrollStep);
  // We need to know the destination position relative to the document as a whole in order to test if the window has scrolled to it.
  let absoluteDestination = window.scrollY + destinationScalar;
  let scrollInterval = setInterval(function(){
    console.log("window.scrolly: " + window.scrollY + "; abs dest: " + absoluteDestination);
    if(Math.abs(window.scrollY - absoluteDestination) > scrollStepDistance){
      window.scrollBy(0, scrollStep);
    } else {
      console.log("Arriving at destination");
      window.scrollTo(window.scrollX, absoluteDestination);
      clearInterval(scrollInterval);
      finishedCallback();
    }
  })
}