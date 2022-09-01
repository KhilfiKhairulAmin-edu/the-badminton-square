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

/* Sumber Kod: https://www.w3schools.com/HOWTO/howto_html_include.asp */