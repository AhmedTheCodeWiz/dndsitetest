const die = document.querySelector(".die");
const angleDeg = 53;
const sideAngleDeg = 360 / 5;
const duration = 2000; // total animation time in ms

const music =  new Audio('assets/fantasy.mp3');
music.volume = 0.3


function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (isMobile()) {
  console.log("This is a mobile device.");
  document.querySelector('h1').innerHTML = 'shake the device to roll for perception!'
} else {
  console.log("This is not a mobile device.");
}

function rollDieTo20() {
  // Remove any current transition
  die.style.transition = "none";
  
  // Reset position so it stays in place
  die.style.transform = "translateZ(0)";

  // Starting transform
  let startRotationX = 0;
  let startRotationY = 0;

  // Final face 20 rotation (matches your SCSS for face 20)
  const face20RotationX = -angleDeg + 180; // ~127
  const face20RotationY = -sideAngleDeg * 5; // ~-360

  // Add full spins to make it roll
  const extraSpinsX = 2;
  const extraSpinsY = 3;
  const targetRotationX = 360 * extraSpinsX + face20RotationX;
  const targetRotationY = 360 * extraSpinsY + face20RotationY;

  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out (slow down at the end)
    const eased = 1 - Math.pow(1 - progress, 4); // cubic easing out

    const currentX = startRotationX + eased * (targetRotationX - startRotationX);
    const currentY = startRotationY + eased * (targetRotationY - startRotationY);

    // Apply the rotation without affecting position
    die.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);


  setTimeout(function(){
    document.querySelector('h2').style.display = 'block';
    document.querySelector('button').style.display = 'block';
  }, 2000);
  
}

// Click to roll
die.addEventListener("click", rollDieTo20);
