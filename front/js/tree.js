

function updateCaret() {
  var toggler = document.getElementsByClassName("caret");
  var i;
  
  for (i = 0; i < toggler.length; i++) {
    toggler[i].replaceWith(toggler[i].cloneNode(true));
    toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }


}

updateCaret()
