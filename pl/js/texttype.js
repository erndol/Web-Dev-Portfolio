// TEXT TYPING

var aText = new Array(
  "Cześć!",
  "Jestem Ernest",
  "i",
  "Chciałbym zaistnieć",
  "We Front-End"
);
var iSpeed = 60;
var iIndex = 0;
var iArrLength = aText[0].length;
var iScrollAt = 20;

var iTextPos = 0;
var sContents = '';
var iRow;

function typewriter() {
  sContents = ' ';
  iRow = Math.max(0, iIndex - iScrollAt);
  var destination = document.getElementById("typedtext");

  while (iRow < iIndex) {
    sContents += aText[iRow++] + '<br />';
  }
  destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
  if (iTextPos++ == iArrLength) {
    iTextPos = 0;
    iIndex++;
    if (iIndex != aText.length) {
      iArrLength = aText[iIndex].length;
      setTimeout("typewriter()", 250);
    }
  } else {
    setTimeout("typewriter()", iSpeed);
  }
}


typewriter();



document.getElementById("typedtext").style.color = "#eaeaea";
document.getElementById("typedtext").style.textShadow = "2px 2px 1px #a9a9a9, 4px 4px 2px #2a2a2a";



// MENU NAV DELAY

$(".trip").each(function (i) {
    $(this).delay(i * 100).fadeIn();
  });
  