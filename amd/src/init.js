define([
  'jquery',
  'format_picturelink/drag'

], function($, dragBall) {

  const PARENTCLASS = `picturelink`;
  const mainBlock = document.querySelector(`.${PARENTCLASS}`);
  let dragIsOn = 0;

  const setCoordsToItems = () => {
    const items = Array.from(mainBlock.querySelectorAll(`.picturelink_item`));
    const maxWidth = mainBlock.offsetWidth;
    const maxHeight = mainBlock.offsetHeight;

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    items.forEach((item)=>{
      let coordx = item.dataset.coordx ? item.dataset.coordx : getRandomInt(0,maxWidth);
      let coordy = item.dataset.coordy ? item.dataset.coordy : getRandomInt(0,maxHeight);

      item.dataset.coordx = coordx;
      item.dataset.coordy = coordy;

      item.style.left = coordx + 'px';
      item.style.top = coordy + 'px';
      item.style.opacity = 1;
    });
  }


  return {
    init: function() {

      setCoordsToItems();

      mainBlock.addEventListener('click', function(e){
        let target = e.target;
        while (target != PARENTCLASS) {

          if (target.classList.contains(`drag`)) {
            e.preventDefault();
            if (!dragIsOn) window.open(target.href,'_blank');
            return;
          }

          if (target.id === `picturelink_admin`) {
            target.classList.toggle('active');
            dragIsOn = dragIsOn ? 0 : 1;
            return;
          }

          target = target.parentNode;
        }
      });

      mainBlock.addEventListener('mousedown', function(e){
        // check if drag option is turned on
        if (!dragIsOn) return

        let target = e.target;
        while (target != mainBlock) {
          if (target.classList.contains(`drag`)) {
            dragBall(e, target)
            return;
          }
          target = target.parentNode;
        }
      });

    }
  };

});