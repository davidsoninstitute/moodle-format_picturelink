define(['format_picturelink/ajax'], function(ajax) {
`use strict`

  const collectAllCoods = () => {

  }

  function getCoords(elem) {
    return {
      top: elem.offsetTop,
      left: elem.offsetLeft
    };
  }

  const dragBall = (e, ball) => {

    const coords = getCoords(ball);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    const moveAt = (e) => {

      ball.style.left = (getCoords(ball).left  < 0) ? 0 + 'px' : e.pageX - shiftX + 'px';
      ball.style.top = (getCoords(ball).top  < 0) ? 0 + 'px' : e.pageY - shiftY + 'px';

      if (getCoords(ball).left  > ball.parentNode.offsetWidth) ball.style.left = ball.parentNode.offsetWidth + 'px';
      if (getCoords(ball).top  > ball.parentNode.offsetHeight) ball.style.top = ball.parentNode.offsetHeight + 'px';
    }

    ball.ondragstart = function() {
      return false;
    };

    ball.parentNode.onmousemove = function(e) {
      moveAt(e);
    };

    ball.onmouseup = function() {
      ball.parentNode.onmousemove = null;
      ball.onmouseup = null;

      ajax.data.coords  = 'coords_atik';
      ajax.send();
    };
  }

  return dragBall;

});
