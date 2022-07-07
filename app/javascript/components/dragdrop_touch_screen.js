import { csrfToken } from "@rails/ujs"

const dragDropTouchScreen = () => {
  const eventsContainer = document.querySelector('.index__cards_container')
  if (eventsContainer) {
    function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
            ( navigator.maxTouchPoints > 0 ) ||
            ( navigator.msMaxTouchPoints > 0 );
    }

    if ( is_touch_enabled() ) {

      const dragItems = document.querySelectorAll('.stat-item-drag-target');
      dragItems.forEach(dragItem => {
      dragItem.addEventListener('touchstart', (e) => {
        const id = dragItem.dataset.id
        const statItem = document.querySelector(`#stats-item-${id}`)
        statItem.style.position = 'absolute';
        statItem.style.zIndex = 1000;
        statItem.style.width = '60vw';

        let shiftX = e.clientX - statItem.getBoundingClientRect().left;
        let shiftY = e.clientY - statItem.getBoundingClientRect().top;

        document.body.append(statItem);

        function moveAt(pageX, pageY) {
          statItem.style.left = pageX - statItem.offsetWidth / 2 + 'px';
          statItem.style.top = pageY - statItem.offsetHeight / 2 + 'px';
        }

        // moveAt(e.pageX, e.pageY);

        document.addEventListener('touchmove', onMouseMove)

        // (3) drop the statItem, remove unneeded handlers
        const releaseItem = () => {
          statItem.ontouchend = function() {
            eventsContainer.append(statItem);
            statItem.style.position = '';
            statItem.style.width = '';
            document.removeEventListener('touchmove', onMouseMove);
            statItem.ontouchend = null;
          };
        }

        releaseItem();

        statItem.ondragstart = function() {
          return false;
        };

        let currentDroppable = null;

        function onMouseMove(e) {
          let i;
          for (i=0; i < e.changedTouches.length; i++) {
            moveAt(e.changedTouches[i].pageX, e.changedTouches[i].pageY);
          }

        statItem.hidden = true;
        let elemBelow = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        statItem.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            statItem.ontouchend = function() {
              eventsContainer.append(statItem);
              statItem.style.position = '';
              document.removeEventListener('touchmove', onMouseMove);
              statItem.ontouchend = null;
            };

            const leaveDroppable = (currentDroppable) => {
              currentDroppable.style.transform = 'scale(1)'
            }
            // the logic to process "flying out" of the droppable (remove highlight)
            leaveDroppable(currentDroppable);
            statItem.style.width = '';
          }

          currentDroppable = droppableBelow;

          if (currentDroppable) {
            statItem.addEventListener('touchend', () => {
              fetch(currentDroppable.href.toString(), {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "X-CSRF-Token": csrfToken()
                },
                method: 'PATCH',
                body: JSON.stringify( { id: statItem.dataset.id } )
              })
              hideTarget();
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

export { dragDropTouchScreen };
