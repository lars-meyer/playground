
this.kontra.init();
var x;

// vars
var elemArr = [],
loop,
boxWrapper = document.querySelector('.elem'),
boxWrapperHeight = boxWrapper.clientHeight;

var boxOffY = 50,
    boxOffX = 0,
    boxWidth = 30,
    boxHeight = 30;

var createCount = 1,
    elemCount = 1;

// calcs
if (typeof boxWrapperHeight !== 'undefined') {
  boxOffY = ( boxWrapperHeight / 4 ) ;
}

// create
for (createCount; createCount <= elemCount; createCount++) {

  var sprite = kontra.sprite({
    x: boxOffX,
    y: boxOffY,
    color: 'red',
    width: boxWidth,
    height: boxHeight,
    dx: createCount
  });

  elemArr.push(sprite);

  if (createCount === elemCount) {
    addEvents();
  }
}

function addEvents() {

  loop = kontra.gameLoop({
    update: function() {
      elemArr.forEach(function(item) {
        item.update();
        if (item.x > kontra.canvas.width) {
          item.x = -boxOffX;
        }
      })
    },
    render: function() {
      elemArr.forEach(function(item) {
        item.render();
      })
    }
  });

  startLoop();
}

// start anim and add update/looping
function startLoop() {
  loop.start();
}
