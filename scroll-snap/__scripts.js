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
  threshold: 0.2 // 50% del elemento visible
}

let observer = new IntersectionObserver(handleIntersect, options)

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Aquí puedes manejar lo que sucede cuando una sección se vuelve visible
      setTimeout(() => {
        console.log(`La sección ${entry.target.id} es ahora visible`)
        const section = document.getElementById(entry.target.id)
        document.body.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth'
        })
        console.log(section.offsetTop);
      }, 100)
    }
  })
}

// document.onreadystatechange = function () {
//   if (document.readyState === 'complete') {
//     // let section = document.getElementsByTagName('footer')[0]
//     // const section = document.getElementById('development')
//     // section.scrollIntoView({ block: 'center' })
//     console.log('ready')
//     document.querySelectorAll('[data-scroll-snapping]').forEach((section) => {
//       // console.log(section)
//       observer.observe(section)
//     })
//   }
// }
