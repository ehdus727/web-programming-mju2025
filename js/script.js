var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
  var $resetImage = $(".btn .reset");
  var normalSrc = "asset/reset.png";
  var pressedSrc = "asset/click_btn.png";

  $(".btn").mousedown(function () {
    $resetImage.attr("src", pressedSrc);
  });

  $(".btn").mouseup(function () {
    $resetImage.attr("src", normalSrc);
  });

  $(".btn").mouseleave(function () {
    if ($resetImage.attr("src") === pressedSrc) {
      $resetImage.attr("src", normalSrc);
    }
  });
  var canvas = $("#myCanvas")[0];
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  ctx = canvas.getContext("2d");

  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  $("#myCanvas").mousedown(function (e) {
    mousePressed = true;

    ctx.strokeStyle = getRandomColor();
    Draw(
      e.pageX - $(this).offset().left,
      e.pageY - $(this).offset().top,
      false
    );
  });

  $("#myCanvas").mousemove(function (e) {
    if (mousePressed) {
      Draw(
        e.pageX - $(this).offset().left,
        e.pageY - $(this).offset().top,
        true
      );
    }
  });

  $("#myCanvas").mouseup(function (e) {
    mousePressed = false;
  });

  $("#myCanvas").mouseleave(function (e) {
    mousePressed = false;
  });

  $(".btn").click(function () {
    ClearCanvas();
  });

  setInterval(fadeCanvas, 50);
}
function getRandomRGBValue() {
  return Math.floor(Math.random() * (255 - 150 + 1)) + 150;
}

function getRandomColor() {
  var r = getRandomRGBValue();
  var g = getRandomRGBValue();
  var b = getRandomRGBValue();

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function ClearCanvas() {
  ctx.clearRect(0, 0, $("#myCanvas").width(), $("#myCanvas").height());
}

function fadeCanvas() {
  ctx.globalAlpha = 0;

  ctx.fillStyle = "#ffeddb";
  ctx.fillRect(0, 0, $("#myCanvas").width(), $("#myCanvas").height());

  ctx.globalAlpha = 1.0;
}

function Draw(x, y, isDown) {
  if (isDown) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  lastX = x;
  lastY = y;
}

function setSnowflakeAnimation(snowCount = 50) {
  const svgTemplateString = `
        <svg class="snow" width="12" height="12" viewBox="0 0 12 12" fill="white" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="6" fill="white" />
        </svg>
    `;

  const minDuration = 10;
  const maxDuration = 30;
  const maxDurationRange = maxDuration - minDuration;

  for (let i = 0; i < snowCount; i++) {
    const $snow = $(svgTemplateString);

    // 랜덤 속성 계산
    const duration = Math.random() * maxDurationRange + minDuration;
    const delay = Math.random() * -maxDuration;
    const size = Math.random() * 12 + 8;

    $snow.css({
      left: Math.random() * 100 + "vw",
      top: Math.random() * -100 + "vh",

      width: size + "px",
      height: size + "px",

      "animation-duration": duration + "s",
      "animation-delay": delay + "s",
    });

    $("body").append($snow);
  }
}

$(document).ready(function () {
  InitThis();

  setSnowflakeAnimation(50);
});

$(document).ready(function () {
  InitThis();
});
