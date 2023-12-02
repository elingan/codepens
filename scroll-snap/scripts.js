let currentSection = 0 // Mantén un registro de la sección actual

function handle() {}

function handleScroll(event) {
  console.log(event.deltaY)
  // if (event.deltaY > 0) {
  //   // Desplazarse hacia abajo
  //   if (currentSection < 4) currentSection++
  // } else {
  //   // Desplazarse hacia arriba
  //   if (currentSection > 0) currentSection--
  // }
  // console.log(currentSection)
  // scrollToSection(currentSection)
}

function scrollToSection(section) {
  const targetSection = document.getElementById(`section${section + 1}`)
  //targetSection.scrollIntoView({ behavior: 'smooth' })
}

let options = {
  root: null, // null significa el viewport
  rootMargin: '0px',
  threshold: 0.25 // 50% del elemento visible
}

let observer = new IntersectionObserver(handleIntersect, options)

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Aquí puedes manejar lo que sucede cuando una sección se vuelve visible
      console.log(`La sección ${entry.target.id} es ahora visible`)
      // setTimeout(() => {
      //   const section = document.getElementById(entry.target.id)
      //   section.scrollIntoView({ block: 'start' })
      // }, 500)
    }
  })
}

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    // let section = document.getElementsByTagName('footer')[0]
    // section = document.getElementById('development')
    // section.scrollIntoView({ block: 'start' })
    document.querySelectorAll('.scrollable').forEach((section) => {
      observer.observe(section)
    })
  }
}
