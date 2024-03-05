//  Animazione Sticky della navbar

let containerNavbar = document.querySelector('.container-navbar');
let navbar = document.querySelector('.navbar')
let logo = document.querySelector('#logo')

// console.log(window);

window.addEventListener( 'scroll', ()=>{
    let scrolled = window.scrollY;
    // console.log(scrolled);

    if (scrolled > 0) {
        containerNavbar.classList.add('sticky-top');
        navbar.style.backgroundColor = 'var(--green-light)';
        logo.src = '../../Resources/img/logo_green_dark.png';
        logo.style.transform = 'rotateY(180deg)';
    } else {
        containerNavbar.classList.remove('sticky-top');
        navbar.style.backgroundColor = 'var(--green-dark)';
        logo.src = '../../Resources/img/logo_green_light.png';
        logo.style.transform = 'rotateY(0deg)';
    }

})



//! setInterval()
//* genera un loop infinito e vuole due parametri: il primo è la callback ed il secondo è la frequenza del loop espressa in millisecondi.
//* Chiamata Asincrona: chiamata che resta in attesa che tutto il resto del codice venga eseguito e poi parte la sua esecuzione.

//inizializzo una variabile che sarà il mio contatore
// let counter = 0;

// setInterval( ()=>{
     // primo step:
    // counter++;
    // console.log(counter);

    // secondo step
    // if(counter < 100){
    //     counter++
    //     console.log(counter);
    // } else {
    //     console.log('Mi spiace sto andando avanti');
    // }

// }, 1 )
//clearInterval() interrompe il loop infinito (il set interval)

// terzo step
// let firstNumber = document.querySelector('#firstNumber');
// let counter = 0;

// let interval = setInterval( ()=>{
//     if (counter < 100){
//         counter++;
//         console.log(counter);

//         firstNumber.innerHTML = counter
//     } else {
//         console.log('ultimo giro');
//         clearInterval(interval) //nelle parentesi va inserito l'intervallo da interrompere
//     }
// }, 100 )


//! Isoliamo la logica JS che riguarda solo l'homepage, tramite una condizione

if(document.querySelector('#firstNumber') != null){

    
    //catturiamo gli span che contengono i numeri
    let firstNumber = document.querySelector('#firstNumber');
    let secondNumber = document.querySelector('#secondNumber');
    let thirdNumber = document.querySelector('#thirdNumber');
    
    
    function createInterval(element, final, number) {
        let counter = 0;
        
        let interval = setInterval( ()=>{
        if (counter < final){
            counter++;
            element.innerHTML = counter;
        } else {
            clearInterval(interval)
        }
    }, number )
    
}




//! INTERSECTION OBSERVER
// OGGETTO, permette di intercettare uno o pi1u elementi quando c'è l'intersezione tra la scollbar e l'area visibile (ossia il punto in cui l'elemento che stiamo osservando si trova)

let isChecked = false; //variabile di controllo

// console.dir(IntersectionObserver);
let observer = new IntersectionObserver ( (elementi)=>{
    elementi.forEach( (elemento)=>{
        // console.log(elemento.isIntersecting);
        if(elemento.isIntersecting && isChecked == false){
            createInterval(firstNumber, 100, 40);
            createInterval(secondNumber, 500, 8);
            createInterval(thirdNumber, 1000, 2);
            isChecked = true;
        }
    })
} )

observer.observe(thirdNumber);

//! setTimeout() -> scatta una volta ed esegue un blocco di codice, dopo un certo tempo
let loading = document.querySelector('#loading');
let pageContent = document.querySelector('#pageContent');

setTimeout( ()=>{
    pageContent.classList.remove('d-none');
    loading.classList.add('d-none');
}, 2500)


//intersection observer per animazione immagine Hompage
let imgSection = document.querySelector('#imgSection')

let observerImg = new IntersectionObserver( (elementi)=>{
    elementi.forEach( (elemento)=>{
        if(elemento.isIntersecting){
            imgSection.classList.add('fadeRight');
        }
    })
})

observerImg.observe(imgSection);
}