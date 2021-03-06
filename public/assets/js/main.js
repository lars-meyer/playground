

this.kontra.init();

// vars
var moveArr = [],
    spriteArr = [],
    goalsprite,
    usersprite,
    loop,
    kontra,
    spriteY = -30,
    lastColor = 0,
    loopRunning = false,
    userMove = false,
    currentKey,
    lastKey;

setTimeout( function() {
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
    x: 115,
    y: 115,
    color: 'purple',
    width: 13,
    height: 7
  });

  spriteArr.push(goalsprite);
  spriteArr.push(usersprite);

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

        // collision with canvas end or goalline
        if (item.y > kontra.canvas.height || item.collidesWith(goalsprite) ) {
          randomizeItem(item);
        }

        // collision with user square
        if (item.collidesWith(usersprite)) {
          // console.log('collision user');
          randomizeItem(item);
          // stopLoop();
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

// (re)start loop again
function startLoop() {
  loop.start();
  loopRunning = true;
}

// pause(!) loop
function stopLoop() {
  loop.stop();
  loopRunning = false;
}

// add controls to usersprite
document.addEventListener('keydown', function (event) {
  // console.log(event.keyCode);
  // console.log(event.target);

  event.preventDefault();

  if (!userMove) {
    moveUsersprite(event.keyCode);
    userMove = true;
  }

});

function moveUsersprite(mod) {

  // moveUsersprite
  var coordStep = 5,
      movingSpeed = 15,
      topBound = usersprite.height,
      leftBound = 5,
      rightBound = kontra.canvas.width - usersprite.width - 5,
      bottomBound = goalsprite.position.y + usersprite.height - 15;

  var anim;

  document.addEventListener('keyup', function () {
    clearInterval(anim);
    userMove = false;
  });

  console.log('***', mod , '***');

  if (mod !== lastKey || lastKey === undefined) {
    lastKey = mod;
  }

  switch (mod) {
    // arrow left
    case 37:
      anim = setInterval( function ()  {
        moveSquare('x', true, leftBound);
      }, movingSpeed);

      break;

    // // arrow top
    // case 38:
    //
    //   anim = setInterval( function (){
    //     moveSquare('y', true, topBound);
    //   },  movingSpeed);
    //
    //   break;

    // arrow right
    case 39:
      anim = setInterval( function () {
        moveSquare('x', false, rightBound);
      },movingSpeed);

      break;

    // // arrow down
    // case 40:
    //   anim = setInterval( function () {
    //     moveSquare('y', false, bottomBound);
    //   },  movingSpeed);
    //   break;

    default:
      break;
  }

  function moveSquare( axe, toZero, bound ) {

    if (axe === 'x') {

      if ( toZero ) {
        usersprite.position.x = usersprite.position.x - coordStep;

        // limit
        if ( usersprite.position.x <= bound ) {
          usersprite.position.x = bound;
        }
      }

      else {
        usersprite.position.x = usersprite.position.x + coordStep;

        // limit top
        if ( usersprite.position.x >= bound ) {
          usersprite.position.x = bound;
        }
      }
    }

    else {
      if ( toZero ) {
        usersprite.position.y = usersprite.position.y - coordStep;

        // limit
        if ( usersprite.position.y <= bound ) {
          usersprite.position.y = bound;
        }
      }

      else {
        usersprite.position.y = usersprite.position.y + coordStep;

        // limit top
        if ( usersprite.position.y >= bound ) {
          usersprite.position.y = bound;
        }
      }

    }

  }

  return(true);
};

// add events to buttons like toggle
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
    }
  });

  // pause logic
  var startBtn = document.querySelector('button.button-action.button-start');
  var pauseBtn = document.querySelector('button.button-action.button-pause');

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

  // console.log(elem);
}

// call randomize func
function randomizeItem(item) {
  item.y = spriteY;
  item.x = randomizeVal('offsetX');
  item.color = randomizeVal('color');
  item.dy = randomizeVal('dropRate');
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
