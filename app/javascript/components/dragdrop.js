import { csrfToken } from "@rails/ujs"

const dragDrop = () => {
  const eventsContainer = document.querySelector('.index__cards_container')
  if (eventsContainer) {
    function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
            ( navigator.maxTouchPoints > 0 ) ||
            ( navigator.msMaxTouchPoints > 0 );
    }

    if ( !is_touch_enabled() ) {
      const dragItems = document.querySelectorAll('.stat-item-drag-target');
      dragItems.forEach(dragItem => {
        dragItem.addEventListener('mousedown', (e) => {
          const id = dragItem.dataset.id
          const statItem = document.querySelector(`#stats-item-${id}`)
          // (1) prepare to moving: make absolute and on top by z-index
          statItem.style.position = 'absolute';
          statItem.style.zIndex = 1000;
          statItem.style.width = '30vw';

          let shiftX = e.clientX - statItem.getBoundingClientRect().left;
          let shiftY = e.clientY - statItem.getBoundingClientRect().top;

          // move it out of any current parents directly into body
          // to make it positioned relative to the body
          document.body.append(statItem);

          // centers the statItem at (pageX, pageY) coordinates
          function moveAt(pageX, pageY) {
            statItem.style.left = pageX - statItem.offsetWidth / 2 + 'px';
            statItem.style.top = pageY - statItem.offsetHeight / 2 + 'px';
          }

          // move our absolutely positioned statItem under the pointer
          moveAt(e.pageX, e.pageY);

          // (2) move the statItem on mousemove
          document.addEventListener('mousemove', onMouseMove);

          // (3) drop the statItem, remove unneeded handlers
          const releaseItem = () => {
            statItem.onmouseup = function() {
              eventsContainer.append(statItem);
              statItem.style.position = '';
              statItem.style.width = '';
              document.removeEventListener('mousemove', onMouseMove);
              statItem.onmouseup = null;
            };
          }

          releaseItem();

          // statItem.ondragstart = function() {
          //   return false;
          // };

          let currentDroppable = null;

          function onMouseMove(event) {

            moveAt(event.pageX, event.pageY);

            statItem.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            statItem.hidden = false;

            // mousemove events may trigger out of the window (when the statItem is dragged off-screen)
            // if clientX/clientY are out of the window, then elementFromPoint returns null
            if (!elemBelow) return;

            // potential droppables are labeled with the class "droppable" (can be other logic)
            let droppableBelow = elemBelow.closest('.droppable');

            if (currentDroppable != droppableBelow) {
              // we're flying in or out...
              // note: both values can be null
              //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
              //   droppableBelow=null if we're not over a droppable now, during this event

              if (currentDroppable) {
                statItem.onmouseup = function() {
                  eventsContainer.append(statItem);
                  statItem.style.position = '';
                  document.removeEventListener('mousemove', onMouseMove);
                  statItem.onmouseup = null;
                };

                const leaveDroppable = (currentDroppable) => {
                  currentDroppable.style.transform = 'scale(1)'
                  statItem.style.width = '';
                }
                // the logic to process "flying out" of the droppable (remove highlight)
                leaveDroppable(currentDroppable);
              }

              currentDroppable = droppableBelow;
              if (currentDroppable) {
                statItem.addEventListener('mouseup', () => {
                  fetch(currentDroppable.href.toString(), {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      "X-CSRF-Token": csrfToken()
                    },
                    method: 'PATCH',
                    body: JSON.stringify( { id: statItem.dataset.id } )
                  })
                  hideTarget()
                })

                const hideTarget = () => {
                  statItem.style.display = 'none'
                }

                const enterDroppable = (currentDroppable) => {
                  currentDroppable.style.transform = 'scale(1.1)'
                }
                // the logic to process "flying in" of the droppable
                enterDroppable(currentDroppable);
              }
            }

          }

        })
      });
    }
  };
}

export { dragDrop };
