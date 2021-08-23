// Star Explosion
const options = {
  radius: 150, // explosion size
  variation: 10, // randomized variation on each point's angle
  points: 5 // number of points in explosion
}
const close = document.getElementsByClassName('close');

for (var i = 0; i < close.length; i++) {
  close[i].addEventListener('click', e => explode(e, options));
}

// ==============
// Functions

function explode(e, options) {
  const container = document.createElement('div');
  const target    = e.target;

  container.classList.add('particles-container');
  target.appendChild(container);
  
  for (let i = 0; i < options.points; i++) {
    const referenceAngle = (360 / options.points) * (i + 1);
    const maxAngle = referenceAngle + parseFloat(options.variation);
    const minAngle = referenceAngle - parseFloat(options.variation);
    
    const angle = randomAngleBetween(minAngle, maxAngle);

    const x = Math.cos(angle) * options.radius;
    const y = Math.sin(angle) * options.radius;
    const popup = document.createElement('div');
    popup.classList.add('particle');
    popup.style.top = y + "px";
    popup.style.left = x + "px";
    container.appendChild(popup);
    
    if (i == 0) {
      popup.addEventListener('animationend', () => {
        var parent = $(target).parent(),
            grandparent = parent.parent();

        if (grandparent.hasClass("music")) {
          grandparent.addClass("spin-out");
        }
        if (grandparent.hasClass("popup")) {
          grandparent.addClass("spin-out");
          grandparent[0].addEventListener('animationend', (e) => {
            if (e.animationName == "spinout") {
              grandparent.removeClass("active")
                         .removeClass("spin-out");
            }
          });
        }
        target.removeChild(container);
      });
    }
  }
}

function randomAngleBetween(minAngle, maxAngle) {
  return (Math.random() * (maxAngle - minAngle) + minAngle) / 180 * Math.PI - Math.PI/2;
}
