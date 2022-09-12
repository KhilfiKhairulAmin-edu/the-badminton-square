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
        return
        /* Exit the function: */
      }
    }
}

function prefSidebarOpen () {
    const prefSidebar = document.getElementById("preferenceSidebar");
    // prefSidebar.style.paddingLeft = "0";
    // prefSidebar.style.backgroundColor = "#111";
    prefSidebar.style.width = "12%";
    document.getElementById("vertical-text").style.color = "#C21010";

    prefSidebar.addEventListener("mouseleave", prefSidebarClose, false)
}

function prefSidebarClose () {
    const prefSidebar = document.getElementById("preferenceSidebar");
    // prefSidebar.style.backgroundColor = "transparent";
    prefSidebar.style.width = "0px";
    document.getElementById("vertical-text").style.color = "gray";
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

  if (timerID) {
    let id = timerID;
    while(id >= lastTimerID) {
      clearTimeout(id);
      id--;
    }
    timerID = 0;
  }

  const headerContent = document.getElementById("headerContent");
  headerContent.style.top = "0";

  /* When mouse is hovering over, cancel all hide calls */
  headerContent.addEventListener("mouseover", () => {
    if (timerID) {
      let id = timerID;
      while(id >= lastTimerID) {
        clearTimeout(id);
        id--;
      }
      timerID = 0;
    }
  }, true)

  /* When mouse unhovers, initiates timeout to hide in 1s */
  headerContent.addEventListener("mouseleave", () => {
    timerID = setTimeout(() => {
      hideHeaderContent();
    }, 250);
  }, true)

  /* When no mouse event, initiates timeout to hide in 3s */
  timerID = setTimeout(() => {
    hideHeaderContent();
  }, 1000);
}

/**
 * Hide header content
 * @author The Badminton Square Team
 */
function hideHeaderContent () {
  let wind = window.pageYOffset || document.documentElement.scrollTop;
  if (wind <= 20 ) {
    // console.log(wind);
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
    (st > lastScrollTop) ? hideHeaderContent() : unhideHeaderContent();
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
 }, false);
 
 /* Time event */

 /**
  * Performs several changes to page for printing process
  * @author The Badminton Square Team
  */
function printPage () {
  window.addEventListener('beforeprint', (event) => {
    prefSidebarClose();
    hideHeaderContent();
    document.getElementById("contents").style.width = "100%";
    document.getElementById("headerContent").style.display = "none";
    document.getElementById("headerContent").style.height = "0";
    document.getElementById("preferenceSidebar").style.display = "none";
    document.getElementById("navigation").style.display = "none";
    document.getElementById("pagination").style.display = "none";
    document.getElementById("footer").style.display = "none";
  });
  window.addEventListener('afterprint', (event) => {
    prefSidebarOpen();
    unhideHeaderContent();
    document.getElementById("contents").style.width = "40%";
    document.getElementById("headerContent").style.display = "initial";
    document.getElementById("headerContent").style.height = "97px";
    document.getElementById("preferenceSidebar").style.display = "initial";
    document.getElementById("navigation").style.display = "initial";
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("footer").style.display = "initial";
  });
  window.print();
}

function changeBackground () {

  if (sessionStorage.getItem("mode") === "-1") {
    return
  }
  
  let bgId = localStorage.getItem("bg") || 0;
  bgId = (bgId + 1) % 3;
  localStorage.setItem("bg", `${bgId}`)
  
  setBackground()
}

function setBackground () {
  const bg = document.getElementById("bg");
  let bgId = localStorage.getItem("bg") || 0

  bg.style.backgroundImage = getGradientColour(bgId);
}

function getGradientColour (bgId) {

  let col = ""

  switch (bgId) {
    case "1": {
      col = "linear-gradient(to left, #ff9c7a, #ff9f6b, #ffa45b, #ffaa49, #ffb135, #ffba2a, #ffc31b, #ffcc00, #ffd800, #ffe500, #fff100, #fffe00)";
      break;
    }
    case "2": {
      col = "linear-gradient(to left, #ff007a, #f10092, #d800ae, #ad00cd, #5d12eb)";
      break;
    }
    default: {
      col = "linear-gradient(to left, #0038ff, #008dff, #00b8ff, #00d797, #67eb12)";
      break;
    }
  }
  return col
}

function switchMode () {
  let inverse = sessionStorage.getItem("mode") || 1;
  inverse = inverse * -1;
  sessionStorage.setItem("mode", `${inverse}`);
  setMode();
}

function setMode () {
  
  let sessionMode = sessionStorage.getItem("mode") || 1;

  console.log(sessionMode);
  switch (sessionMode) {
    case "1": {
      lightMode()
      sessionStorage.setItem("mode", "1");
      break
    }
    case "-1": {
      darkMode();
      break
    }
  }
}

function darkMode () {
  const content = document.getElementById("content");
  const contentContainer = document.getElementById("contents");
  const bg = document.getElementById("bg");
  const mode = document.getElementById("mode")
  contentContainer.style.backgroundColor = "#171717"
  content.style.color = "whitesmoke"
  bg.style.backgroundImage = "linear-gradient(to right bottom, #141414, #171717, #1a1a1a, #1c1c1c, #1f1f1f, #212121, #242424, #262626, #282828, #2a2a2a, #2c2c2c, #2e2e2e)"
  mode.className = "fa fa-moon-o";
}

function lightMode () {
  const content = document.getElementById("content");
  const contentContainer = document.getElementById("contents");
  const bg = document.getElementById("bg");
  const mode = document.getElementById("mode")
  contentContainer.style.backgroundColor = "whitesmoke"
  content.style.color = "black"
  bg.style.backgroundImage = getGradientColour(localStorage.getItem("bg"));
  mode.className = "fa fa-sun-o";
}

let play = false;
let audio = new Audio("/sound/jazz.mp3");
function playAudio () {
  play ? audio.pause() : audio.play();
  play = !play;
}