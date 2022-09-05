/* This file is used to store all common utilities that each page of this website will use */

/**
 * Opens sidebar menu inside the header component
 * @since 2nd September 2022
 * @author The Badminton Square Team
 */
function sidebarOpen() {
    document.getElementById("mySidebar").style.width = "14%";
    // document.getElementById("main").style.marginLeft = "250px";

    const sidebarComplement = document.getElementById("sidebarComplement");

    // Listens for click event
    // When click is outside Sidebar component, the component closes
    sidebarComplement.addEventListener("click", sidebarClose, true);

    // Cover everything outside Sidebar so they will not react with cursor
    sidebarComplement.style.zIndex = 0;
}

/**
 * Closes sidebar menu inside the header component
 * @since 2nd September 2022
 * @author The Badminton Square Team
 */
function sidebarClose() {
    document.getElementById("mySidebar").style.width = "0";
    const sidebarComplement = document.getElementById("sidebarComplement");

    // Unlisten for click outside Sidebar 
    sidebarComplement.removeEventListener("click", sidebarClose);

    // Remove cover from outside Sidebar
    sidebarComplement.style.zIndex = -1;

    // document.getElementById("main").style.marginLeft= "0";
}

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