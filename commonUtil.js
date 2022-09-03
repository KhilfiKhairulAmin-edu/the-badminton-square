/* This file is used to store all common utilities that each page of this website will use */

/**
 * @since 2nd September 2022
 */
function openNav() {
    document.getElementById("mySidebar").style.width = "240px";
    // document.getElementById("main").style.marginLeft = "250px";
    const sidebarComplement = document.getElementById("sidebarComplement");
    sidebarComplement.addEventListener("click", closeNav, true);
}

/**
 * @since 2nd September 2022
 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    const sidebarComplement = document.getElementById("sidebarComplement");
    sidebarComplement.removeEventListener("click", closeNav);
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