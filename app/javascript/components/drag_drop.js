const dragDrop = () => {
  const eventsContainer = document.querySelector('.index__cards_container')
  if (eventsContainer) {
    const statItems = document.querySelectorAll('.stats-item');
    statItems.forEach(statItem => {
      statItem.addEventListener('mousedown', (e) => {
        // (1) prepare to moving: make absolute and on top by z-index
        statItem.style.position = 'absolute';
        statItem.style.zIndex = 1000;

        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(statItem);

        // centers the statItem at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
          statItem.style.left = pageX - statItem.offsetWidth / 2 + 'px';
          statItem.style.top = pageY - statItem.offsetHeight / 2 + 'px';
        }

        // move our absolutely positioned statItem under the pointer
        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }

        // (2) move the statItem on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // (3) drop the statItem, remove unneeded handlers
        statItem.onmouseup = function() {
          eventsContainer.append(statItem);
          statItem.style.position = '';
          document.removeEventListener('mousemove', onMouseMove);
          statItem.onmouseup = null;
        };

        statItem.ondragstart = function() {
          return false;
        };
      })
    });

  };
}

export { dragDrop };
