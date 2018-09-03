
this.kontra.init();

// vars
var moveArr = [],
    spriteArr = [],
    goalsprite,
    loop,
    // boxWrapper = document.querySelector('.elem'),
    // boxWrapperHeight = boxWrapper.clientHeight;
    kontra,
    spriteY = -30,
    colorCount = 0;

var staticStuff = createStaticElems();

/**
* create all static elems
*
*/
function createStaticElems () {
  // create goal line
  goalsprite = kontra.sprite({
    x: 0,
    y: 130,
    color: '#000',
    width: 500,
    height: 1
  });
  spriteArr.push(goalsprite);

  return true;
}

if (staticStuff) {
  createMovingElems();
}

/**
* create all moving elems
*
*/
function createMovingElems () {

  var movCreateCount = 1,
      movElemCount = 5;

  for (movCreateCount; movCreateCount <= movElemCount; movCreateCount++) {

    var spriteWidth = 10,
        spriteHeight = 10,
        spriteX = 5,
        dropRate = 1;

    if (movCreateCount > 1) {
      spriteX = spriteX + 10;
    }

    var sprite = kontra.sprite({
      x: randomizeVal('offsetX'),
      y: spriteY,
      color: randomizeVal('color'),
      width: spriteWidth,
      height: spriteHeight,
      dy: randomizeVal('dropRate')
    });

    moveArr.push(sprite);

    if (movCreateCount === movElemCount) {
      addElemsToCanvas();
    }
  }
}

function addElemsToCanvas() {

  loop = kontra.gameLoop({

    update: function() {
      moveArr.forEach(function(item) {

        item.update();

        if (item.y > kontra.canvas.height) {
          item.y = spriteY;
          item.x = randomizeVal('offsetX');
          item.color = randomizeVal('color');
          item.dy = randomizeVal('dropRate');
        }

        if (item.collidesWith(goalsprite)) {
          item.y = spriteY;
          item.x = randomizeVal('offsetX');
          item.color = randomizeVal('color');
          item.dy = randomizeVal('dropRate');
        }

      });
    },
    render: function() {
      spriteArr.forEach(function(item) {
        item.render();
      });

      moveArr.forEach(function(item) {
        item.render();
      });
    }
  });

  startLoop();
}

function startLoop() {
  loop.start();
}

// randomize new values for each mov elem
function randomizeVal(mod) {

  if (mod === 'offsetX') {
    // offset X
    var spriteX = 20,
        xMinFac = 1,
        xMaxFac = 13,
        minX = Math.ceil(xMinFac),
        maxX = Math.floor(xMaxFac),
        xFactor = Math.floor(Math.random() * (maxX - minX)) + minX;

    spriteX = spriteX * xFactor;
    // console.log('spriteX', spriteX);
    return(spriteX);
  }

  if (mod === 'dropRate') {
    // dropRate
    var minDrop = 1,
        maxDrop = 4,
        dropRate = Math.random() * (maxDrop - minDrop) + minDrop,
        dropRate = dropRate.toFixed(2);

    return(dropRate);
  }

  if (mod === 'color') {

    var color;

    if (colorCount === 0) {
      color = 'red';
      colorCount++;
    }

    else if (colorCount === 1) {
      color = 'yellow';
      colorCount++;
    }

    else if (colorCount === 2) {
      color = 'orange';
      colorCount++;
    }

    else if (colorCount === 3) {
      color = 'blue';
      colorCount++;
    }

    else {
      color = 'green';
      colorCount = 0;
    }

    return(color);
  }
}
