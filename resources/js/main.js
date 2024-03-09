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

//catturo il pulsante per attivare la dark-mode
let btnDarkMode = document.querySelector('#btnDarkMode');

let isClicked = true;

btnDarkMode.addEventListener('click', ()=>{

    if(isClicked){ //dark mode

        document.documentElement.style.setProperty('--light', 'rgb(20, 20, 20)');
        document.documentElement.style.setProperty('--dark', 'rgb(245, 245, 245)');

        btnDarkMode.innerHTML = ` <i class="fa-solid fa-sun fa-2x"></i> `;

        isClicked = false;

        //impostare una coppia chiave valore nel local storage
        localStorage.setItem('mode', 'dark');
    } else { //light mode

        document.documentElement.style.setProperty('--light', 'rgb(245, 245, 245)');
        document.documentElement.style.setProperty('--dark', 'rgb(20, 20, 20)');

        btnDarkMode.innerHTML = `<i class="fa-solid fa-moon fa-2x"></i>`;

        isClicked = true;

        localStorage.setItem('mode', 'light');
    }
}) 

//leggere un valore di una chiave all'interno del local storage
let mode = localStorage.getItem('mode');
console.log(mode);

if (mode === 'dark') {
    document.documentElement.style.setProperty('--light', 'rgb(20, 20, 20)');
    document.documentElement.style.setProperty('--dark', 'rgb(245, 245, 245)');
    btnDarkMode.innerHTML = ` <i class="fa-solid fa-sun fa-2x"></i> `;
    isClicked = false;
} else {
    document.documentElement.style.setProperty('--light', 'rgb(245, 245, 245)');
    document.documentElement.style.setProperty('--dark', 'rgb(20, 20, 20)');
    btnDarkMode.innerHTML = `<i class="fa-solid fa-moon fa-2x"></i>`;
    isClicked = true;
}


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
    
    
    //fetch per mostrare gli ultimi annunci
    fetch('annunci.json')
    .then(response => response.json())
    .then(data => {
        
        //catturo la row alla quale appendere le card
        let lastCardsWrapper = document.querySelector('#lastCardsWrapper');
        
        //creiamo le card di annunci
        function createLastCards (array){
            
            let final = [];
            
            do{
                let randIndex = Math.floor(Math.random()*(47 -0 + 1)+1);
                // console.log(randIndex)
                if (!final.includes(array[randIndex])) {
                    final.push(array[randIndex]);
                }
            } while (final.length <= 5)
            
            
            final.forEach( (annuncio, index)=> {
                
                let div = document.createElement('div');
                div.classList.add('col-12', 'col-md-4', 'my-3');
                div.innerHTML = `
                <div class="card overflow-hidden" >
                
                <div class="position-relative overflow-hidden">
                <a href="">
                <img src="./Resources/img/property-${index+1}.jpg" class="card-img-top img-zoom" alt="...">
                </a>
                
                <div class="position-absolute bottom-0 start-0 bg-white rounded-top py-1 px-3 mx-3 text-category">
                ${annuncio.category}
                </div>
                </div>
                
                <div class="card-body">
                
                <p class="text-price">
                ${annuncio.price} €
                </p>
                <a href="#" class="text-decoration-none">
                <h5 class="card-title">${annuncio.name}</h5>
                </a>
                </div>
                </div>
                `
                
                lastCardsWrapper.appendChild(div)
                
            })
            // console.log(final);
        }
        
        createLastCards(data);
        
    })
}