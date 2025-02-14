let isRolling = false
let isTouched = false
let isScrolled = false

let currentSectionId = null
let currentSection = null
let currentSectionPosition = null
let scrolledSections = []
let scrolledSectionIds = []

let observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 })

const currentScrollPosition = document.documentElement.scrollTop
const totalHeight = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
)

const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      currentSectionId = entry.target.id
      currentSectionPosition = scrolledSectionIds.indexOf(currentSectionId)
      currentSection = scrolledSections[currentSectionPosition]
    }
  })
}

function handleScroll(isUp = false) {
  const currentScrollPosition = document.documentElement.scrollTop
  let scroll = 0
  if (isUp) {
    scroll = currentScrollPosition - viewHeight <= 0 ? 0 : currentScrollPosition - viewHeight
  } else {
    scroll =
      currentScrollPosition + viewHeight >= totalHeight ? currentScrollPosition : currentScrollPosition + viewHeight
  }
  if (currentScrollPosition === scroll) return
  window.scrollTo({ top: scroll, behavior: 'smooth' })
}

document.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault()
    const currentScrollPosition = document.documentElement.scrollTop
    if (!isRolling || currentScrollPosition <= 0 || currentScrollPosition === totalHeight - viewHeight) {
      handleScroll(event.deltaY < 0)
      isRolling = true
    }
  },
  { passive: false }
)

document.onkeydown = (event) => {
  if (['ArrowUp', 'PageUp', 'ArrowDown', 'PageDown'].includes(event.key)) {
    event.preventDefault()
    handleScroll(['ArrowUp', 'PageUp'].includes(event.key))
  }
}

document.ontouchend = () => {
  isRolling = false
}

document.onscrollend = () => {
  isRolling = false
}

document.onmouseup = (event) => {
  isRolling = false
  setTimeout(() => {
    currentSection.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    scrolledSections = document.querySelectorAll('[data-scroll-snapping]')
    scrolledSections.forEach((section) => {
      scrolledSectionIds.push(section.id)
      observer.observe(section)
    })
  }
}
