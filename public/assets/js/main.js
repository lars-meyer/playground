

this.kontra.init();

// vars
var moveArr = [],
    spriteArr = [],
    goalsprite,
    usersprite,
    loop,
    // boxWrapper = document.querySelector('.elem'),
    // boxWrapperHeight = boxWrapper.clientHeight;
    kontra,
    spriteY = -30,
    lastColor = 0,
    loopRunning = false;

setTimeout( function() {
  console.log('now');

  var staticStuff = createStaticElems();

  if (staticStuff) {
    createMovingElems();
  }


}, 1000);

/**
* create all static elems
*
*/
function createStaticElems () {

  // create goal line
  goalsprite = kontra.sprite({
    x: 0,
    y: 125,
    color: '#000',
    width: 500,
    height: 1
  });

  usersprite = kontra.sprite({
    x: 70,
    y: 120,
    color: 'purple',
    width: 10,
    height: 5
  });

  spriteArr.push(goalsprite);
  spriteArr.push(usersprite);

  document.addEventListener('keydown', function (event) {
    console.log('keydown', event);
    console.log(event.keyCode);

  });



  return true;
}

/**
* create all moving elems
*
*/
function createMovingElems () {

  // counts objects
  var movCreateCount = 1,
  // object count limit
      movElemLimit = 5;

  for (movCreateCount; movCreateCount <= movElemLimit; movCreateCount++) {

    var spriteWidth = 10,
        spriteHeight = 5;

    var sprite = kontra.sprite({
      x: randomizeVal('offsetX'),
      y: spriteY,
      color: randomizeVal('color'),
      width: spriteWidth,
      height: spriteHeight,
      dy: randomizeVal('dropRate')
    });

    moveArr.push(sprite);

    if (movCreateCount === movElemLimit) {
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
  btnEvents();
}

function startLoop() {
  loop.start();
  loopRunning = true;
}


function stopLoop() {

  loop.stop();
  loopRunning = false;
}

function btnEvents() {

  var actionBtns = document.querySelectorAll('button.button-action');

  // show pause on init
  document.querySelector('.button-pause').classList.add('js-active');

  if (actionBtns.length) {
    actionBtns.forEach(function(actionBtn) {
      toggleActions(actionBtns, actionBtn);
      actionBtn.addEventListener('click', function() {
        toggleActions(actionBtns, actionBtn);
      });
    });
  }
}

function toggleActions(actionBtns, elem) {

  actionBtns.forEach(function(actionBtn) {

    // toggle js-active-class for each elem if there is one
    if ( actionBtn.dataset.jsAction === elem.dataset.jsAction ) {
      actionBtn.classList.toggle('js-active');
      elem.classList.toggle('js-active');
    }

    // pause logic
    var startBtn = document.querySelector('.button-start');
    var pauseBtn = document.querySelector('.button-pause');

    pauseBtn.addEventListener('click', function() {
      if (loopRunning) {
        stopLoop();
      }
    });

    startBtn.addEventListener('click', function() {
      if (!loopRunning) {
        startLoop();
      }
    });

  });

  console.log(elem);
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
        maxDrop = 3,
        dropRate = Math.random() * (maxDrop - minDrop) + minDrop,
        dropRateRnd = dropRate.toFixed(2);

    return(dropRateRnd);
  }

  if (mod === 'color') {

    var color;

    // dropRate
    var mincolor = 1,
        colorCount = 5,
        colorSelector = Math.random() * (colorCount - mincolor) + mincolor,
        colorSelectorRnd = parseInt(colorSelector);

    if ( colorSelectorRnd === lastColor ) {
      colorSelectorRnd++;
    }
    // console.log(colorSelectorRnd, lastColor);

    lastColor = colorSelectorRnd;

    switch(colorSelectorRnd) {
      case 0:
        color = 'red';
        break;
      case 1:
        color = 'yellow';
        break;
      case 2:
        color = 'orange';
        break;
      case 3:
        color = 'blue';
        break;
      default:
        color = 'green';
    }

    // console.log(color);

    return(color);
  }
}
