/**
 * Embed HTML code from some HTML file into this current HTML file
 * @since 31st August 2022
 * @author https://www.w3schools.com/HOWTO/howto_html_include.asp
 */
 function initComponent() {
    var z, i, element, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      element = z[i];
      /*search for elements with a certain atrribute:*/
      file = element.getAttribute("component");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {element.innerHTML = this.responseText;}
            if (this.status == 404) {element.innerHTML = "404 Page not found";}
            /* Remove the attribute, and call this function once more: */
            element.removeAttribute("component");
            initComponent();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
}

// function onLoad () {
//     const prefSidebar = document.getElementById("preferenceSidebar");

//     console.log(prefSidebar);

//     prefSidebar.addEventListener("mouseover", function () {
//         prefSidebarOpen();
//     });

//     prefSidebar.addEventListener("mouseout", function () {
//         prefSidebarClose();
//     });
// }

function prefSidebarOpen () {
    const prefSidebar = document.getElementById("preferenceSidebar");
    // prefSidebar.style.paddingLeft = "0";
    // prefSidebar.style.backgroundColor = "#111";
    prefSidebar.style.width = "12%";

    prefSidebar.addEventListener("mouseleave", prefSidebarClose, false)
}

function prefSidebarClose () {
    const prefSidebar = document.getElementById("preferenceSidebar");
    // prefSidebar.style.backgroundColor = "transparent";
    prefSidebar.style.width = "0px";
    // prefSidebar.style.paddingLeft = "10%";
}

/* This code is used to define the behaviour of header content */
/**
 * Save ID of timer to track setTimeout function
 */
let timerID = 0;
let lastTimerID = 0;
/**
 * Unhide header content and manage when to hide content again
 * @author The Badminton Square Team
 */
function unhideHeaderContent () {

  const headerContent = document.getElementById("headerContent");
  headerContent.style.top = "0";

  /* When mouse is hovering over, cancel all hide calls */
  headerContent.addEventListener("mouseover", () => {
    let id = timerID;
    while(id >= lastTimerID) {
      clearTimeout(id);
      id--;
    }
    lastTimerID = timerID;
  }, true)

  /* When mouse unhovers, initiates timeout to hide in 1s */
  headerContent.addEventListener("mouseleave", () => {
    timerID = setTimeout(() => {
      hideHeaderContent();
    }, 1000);
  }, true)

  /* When no mouse event, initiates timeout to hide in 3s */
  timerID = setTimeout(() => {
    hideHeaderContent();
  }, 3000);
}

/**
 * Hide header content
 * @author The Badminton Square Team
 */
function hideHeaderContent () {
  let wind = window.pageYOffset || document.documentElement.scrollTop
  if (wind <= 50) {
    console.log(wind);
    return
  }
  document.getElementById("headerContent").style.top = "-120px";
}
/* Scroll up/down event */
/**
 * Save the current sroll offset
 */
let lastScrollTop = 0;
window.addEventListener("scroll", function(){ 
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop){
       hideHeaderContent();
    } else {
       unhideHeaderContent();
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
 }, false);
 
 /* Time event */