function puzzle(bild, canvas, hoehe, breite) {
  var ctx = canvas.getContext("2d")
  var abmessungen = calcAbmessungen(hoehe, breite)
  var imageObj = new Image()
  imageObj.src = bild

  var bilderreihenfolge = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  imageObj.onload = function() {
    draw(ctx, imageObj, abmessungen, hoehe, breite, bilderreihenfolge)
  }


  var selected;
  canvas.addEventListener("click", function(e) {
    var x = e.offsetX
    var y = e.offsetY

    var clicked;

    for (var i = 0; i < abmessungen.length; i++) {
      if (abmessungen[i].x <= x && abmessungen[i].y <= y && abmessungen[i].x + hoehe >= x && abmessungen[i].y + breite >= y) {
        clicked = i;
        break;
      }
    }

    if (selected >= 0 && selected != clicked) {
      bewege(bilderreihenfolge, clicked, selected)
      draw(ctx, imageObj, abmessungen, hoehe, breite, bilderreihenfolge)
      selected = undefined

      if (istGeordnet(bilderreihenfolge)) {
        setTimeout(function() {
          alert("GEWONNEN")
        }, 500);
      }
    } else {
      selected = clicked;
    }

  })

}


function draw(ctx, image, abmessungen, hoehe, breite, reihenfolge) {
  reihenfolge.forEach(function(bildnummer, index) {
    ctx.drawImage(image, abmessungen[bildnummer].x, abmessungen[bildnummer].y, hoehe, breite, abmessungen[index].x, abmessungen[index].y, hoehe, breite)
  })
}

function calcAbmessungen(hoehe, breite) {
  var abmessungen = []
  for (var i = 0; i < 3; i += 1) {
    for (var j = 0; j < 4; j += 1) {
      abmessungen.push({
        y: hoehe * i,
        x: breite * j,
      })
    }
  }
  return abmessungen;
}


// bewege(geshuffleteBilder, 0, 1)
//
//
// bewege(geshuffleteBilder, 1, 0)
// console.log(geshuffleteBilder);
// console.log("GEWONNEN:", istGeordnet(geshuffleteBilder))


function shuffle(bilder) {
  for (var i = 0; i < bilder.length; i++) {
    var zufallsIndex = Math.floor(Math.random() * bilder.length)
    var zwischenspeicher = bilder[zufallsIndex]
    bilder[zufallsIndex] = bilder[i]
    bilder[i] = zwischenspeicher
  }
  return bilder
}

function bewege(geshuffleteBilder, position1, position2) {
  var zwischenspeicher = geshuffleteBilder[position1]
  geshuffleteBilder[position1] = geshuffleteBilder[position2]
  geshuffleteBilder[position2] = zwischenspeicher
  return geshuffleteBilder
}

function istGeordnet(geshuffleteBilder) {
  var geordnet = true

  for (var i = 0; i < geshuffleteBilder.length; i++) {
    if (geshuffleteBilder[i - 1] >= 0 && geshuffleteBilder[i - 1] + 1 != geshuffleteBilder[i]) {
      geordnet = false
    }
  }

  return geordnet
}
