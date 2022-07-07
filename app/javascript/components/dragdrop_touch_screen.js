const dragDropTouchScreen = () => {
  const eventsContainer = document.querySelector('.index__cards_container')
  if (eventsContainer) {
    function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
            ( navigator.maxTouchPoints > 0 ) ||
            ( navigator.msMaxTouchPoints > 0 );
    }

    if ( is_touch_enabled() ) {
      // console.log('touch');
      // document.addEventListener('touchstart', () => {
      //   console.log('strat');
      // })
      //       document.addEventListener('touchend', () => {
      //   console.log('end');
      // })
      //       document.addEventListener('touchcancel', () => {
      //   console.log('touchcancel');
      // })
      //       document.addEventListener('touchmove', (e) => {
      //   console.log(e);
      // })

      const dragItems = document.querySelectorAll('.stat-item-drag-target');
      dragItems.forEach(dragItem => {
      dragItem.addEventListener('touchstart', (e) => {
        const id = dragItem.dataset.id
        const statItem = document.querySelector(`#stats-item-${id}`)
        statItem.style.position = 'absolute';
        statItem.style.zIndex = 1000;

        let shiftX = e.clientX - statItem.getBoundingClientRect().left;
        let shiftY = e.clientY - statItem.getBoundingClientRect().top;

        document.body.append(statItem);

        function moveAt(pageX, pageY) {
          statItem.style.left = pageX - statItem.offsetWidth / 2 + 'px';
          statItem.style.top = pageY - statItem.offsetHeight / 2 + 'px';
        }

        moveAt(e.pageX, e.pageY);

        document.addEventListener('touchmove', (e) => {
          let i;
          for (i=0; i < e.changedTouches.length; i++) {
            moveAt(e.changedTouches[i].pageX, e.changedTouches[i].pageY);
          }
        });

        // (3) drop the statItem, remove unneeded handlers
        statItem.ontouchend = function() {
          eventsContainer.append(statItem);
          statItem.style.position = '';
          document.removeEventListener('touchmove', onMouseMove);
          statItem.ontouchend = null;
        };

        statItem.ondragstart = function() {
          return false;
        };

        let currentDroppable = null;

        function onMouseMove(event) {
          console.log('mouve');
        moveAt(event.pageX, event.pageY);

        statItem.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        statItem.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        console.log(elemBelow, droppableBelow);
        if (currentDroppable != droppableBelow) {

          if (currentDroppable) {
            statItem.ontouchend = function() {
              eventsContainer.append(statItem);
              statItem.style.position = '';
              document.removeEventListener('touchmove', onMouseMove);
              statItem.ontouchend = null;
            };
            leaveDroppable(currentDroppable);
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
              }).then(response => hideTarget(response))
            })

            const hideTarget = (response) => {
              if (response.ok) {
                statItem.style.display = 'none'
              }
            }
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
