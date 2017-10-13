window.onload = function () {
  const $container = document.querySelector('#container')
  const $list = document.querySelector('.item-list')
  const $prev = document.querySelector('#prev')
  const $next = document.querySelector('#next')
  const $buttons = document.querySelectorAll('#buttons span')
  let timer
  let index = 0
  let lastIndex = 0

  function animate (offset) {
    const left = window.getComputedStyle($list).left || $list.currentStyle.left
    var oLeft = parseInt(left) + offset
    $list.style.left = oLeft + 'px'

    if (oLeft < -2700) {
      $list.style.left  = -900 + 'px'
    } else if (oLeft > -900) {
      $list.style.left = -2700 + 'px'
    }
  }

  function buttonOn (index, lastIndex) {
    $buttons[index].classList.add('on')
    $buttons[lastIndex].classList.remove('on')
  }

  function next () {
    lastIndex = index
    index++
    if (index > 2) {
      index = 0
    }
    play()
    buttonOn(index, lastIndex)
    animate(-900)
  }

  function prev () {
    lastIndex = index
    index--
    if (index < 0) {
      index = 2
    }
    buttonOn(index, lastIndex)
    animate(900)
  }

  function play () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      next()
    }, 2000)
  }

  function stop () {
    clearTimeout(timer)
  }

  $buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
      const oLeft = 900 * (index - i)
      animate(oLeft)
      lastIndex = index
      index = i
      buttonOn(index, lastIndex)
    })
  })

  play()

  $prev.addEventListener('click', () => {
    prev()
  })
  $next.addEventListener('click', () => {
    next()
  })
  $container.addEventListener('mouseover', () => {
    stop()
  })
  $container.addEventListener('mouseout', () => {
    play()
  })
}