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

        if (parent.hasClass("music")) {
          parent.addClass("spin-out");
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


// Fire explosion
// document.addEventListener("DOMContentLoaded",() => {
//   var fires = $(".fire-explosion");
//   for (var i = 0; i < fires.length; i++) {
//     let button = new FireExplosion(fires[i]);
//   }
// });

// class FireExplosion {
//   constructor(el) {
//     this = el;
//     this.width = 0;
//     this.height = 0;
//     this.centerX = 0;
//     this.centerY = 0;
//     this.pieceWidth = 0;
//     this.pieceHeight = 0;
//     this.piecesX = 9;
//     this.piecesY = 4;
//     this.duration = 1000;

//     if (document.body.animate)
//       // this.addEventListener("click",this.explode.bind(this,this.duration));
//       $(".explode").click(function(){
//         var btn = $(this);
//         $(".fire-explosion").each(function(){
//           var fireExplosion = $(this);

//           if (fireExplosion.attr("id") != btn.data("value")) {
//             fireExplosion[0].explode.bind(this,this.duration);
//           }
//         });
//       });
//     }

//   explode(duration) {
//     let explodingState = "exploding";

//     if (!this.classList.contains(explodingState)) {
//       this.classList.add(explodingState);

//       this.createParticles("fire",25,duration);
//     }
//   }
//   createParticles(kind,count,duration) {
//     for (let c = 0; c < count; ++c) {
//       let r = randomFloat(0.25,0.5),
//         diam = r * 2,
//         xBound = this.centerX - r,
//         yBound = this.centerY - r,
//         easing = "cubic-bezier(0.15,0.5,0.5,0.85)";

//       let x = this.centerX + randomFloat(-xBound,xBound),
//         y = this.centerY + randomFloat(-yBound,yBound),
//         a = calcAngle(this.centerX,this.centerY,x,y),
//         dist = randomFloat(1,5);

//       new FireParticle(this,x,y,diam,diam,a,dist,duration,easing);
//     }
//   }
// }
// class Particle {
//   constructor(parent,x,y,w,h,angle,distance = 1,className2 = "") {
//     let width = `${w}em`,
//       height = `${h}em`,
//       adjustedAngle = angle + Math.PI/2;

//     this.div = document.createElement("div");
//     this.div.className = "particle";

//     if (className2)
//       this.div.classList.add(className2);

//     this.div.style.width = width;
//     this.div.style.height = height;

//     parent.appendChild(this.div);

//     this.s = {
//       x: x - w/2,
//       y: y - h/2
//     };
//     this.d = {
//       x: this.s.x + Math.sin(adjustedAngle) * distance,
//       y: this.s.y - Math.cos(adjustedAngle) * distance
//     };
//   }
//   runSequence(el,keyframesArray,duration = 1e3,easing = "linear",delay = 0) {
//     let animation = el.animate(keyframesArray, {
//         duration: duration,
//         easing: easing,
//         delay: delay
//       }
//     );
//     animation.onfinish = () => {
//       let parentCL = el.parentElement.classList;

//       el.remove();

//       if (!document.querySelector(".particle"))
//         parentCL.remove(...parentCL);
//     };
//   }
// }
// class FireParticle extends Particle {
//   constructor(parent,x,y,w,h,angle,distance,duration,easing) {
//     super(parent,x,y,w,h,angle,distance,"particle--fire");

//     let sx = this.s.x,
//       sy = this.s.y,
//       dx = this.d.x,
//       dy = this.d.y;

//     this.runSequence(this.div,[
//       {
//         background: "hsl(60,100%,100%)",
//         transform: `translate(${sx}em,${sy}em) scale(1)`
//       },
//       {
//         background: "hsl(60,100%,80%)",
//         transform: `translate(${sx + (dx - sx)*0.25}em,${sy + (dy - sy)*0.25}em) scale(4)`
//       },
//       {
//         background: "hsl(40,100%,60%)",
//         transform: `translate(${sx + (dx - sx)*0.5}em,${sy + (dy - sy)*0.5}em) scale(7)`
//       },
//       {
//         background: "hsl(20,100%,40%)"
//       },
//       {
//         background: "hsl(0,0%,20%)",
//         transform: `translate(${dx}em,${dy}em) scale(0)`
//       }
//     ],randomInt(duration/2,duration),easing);
//   }
// }
// function calcAngle(x1,y1,x2,y2) {
//   let opposite = y2 - y1,
//     adjacent = x2 - x1,
//     angle = Math.atan(opposite / adjacent);

//   if (adjacent < 0)
//     angle += Math.PI;

//   if (isNaN(angle))
//     angle = 0;

//   return angle;
// }
// function propertyUnitsStripped(el,property,unit) {
//   let cs = window.getComputedStyle(el),
//     valueRaw = cs.getPropertyValue(property),
//     value = +valueRaw.substr(0,valueRaw.indexOf(unit));

//   return value;
// }
// function pxToEm(px) {
//   let el = document.querySelector(":root");
//   return px / propertyUnitsStripped(el,"font-size","px");
// }
// function randomFloat(min,max) {
//   return Math.random() * (max - min) + min;
// }
// function randomInt(min,max) {
//   return Math.round(Math.random() * (max - min)) + min;
// }