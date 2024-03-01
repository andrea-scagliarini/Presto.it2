// animazione sticky della navbar

let contaninerNavbar = document.querySelector('.container-navbar');
let navbar = document.querySelector('.navbar');
let logo = document.querySelector('#logo');

window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY;

    if(scrolled > 0){
        contaninerNavbar.classList.add('sticky-top');
        navbar.style.backgroundColor = 'var(--green-light)';
        logo.src = '../../resources/img/logo_green_dark.png';
        logo.style.transform = 'rotateY(180deg)';
    } else {
        contaninerNavbar.classList.remove('sticky-top');
        navbar.style.backgroundColor = 'var(--green-dark)';
        logo.src = '../../resources/img/logo_green_light.png';
        logo.style.transform = 'rotateY(0deg)';

    }
})
//fine animazione


// setInterval()
//genera un loop infinito, vuole 2 parametri: callback e frequenza in ms
// Chiamata asincrona: chiamata che resta in attesa che tutto il codice venga eseguito e poi parta la sua esecuzione

//inizializzo una variabile che sarà il mio contatore
// let counter = 0;

// setInterval(()=>{
    // primo step:
    // counter++;

    //secondo step:
    // if (counter > 100){
    //     counter++
    // } else {
    //     console.log('mi disp sto andando avanti');
    // }

    //clearInterval() interrompe il loop ionfinito (ossia il set interval)
// }, 1)

//terzo step
// let firstNumber = document.querySelector('#firstNumber');
// let counter = 0;

// let interval = setInterval(()=>{
//     if (counter < 100){
//         counter++;
//         console.log(counter);

//         firstNumber.innerHTML = counter
//     } else {
//         console.log('ultimo giro');
//         clearInterval(interval); nelle parentesi va inserito l'intervallo da interrompere
//     }
// }, 10)
// })



// Isoliamo la logica JD che riguarda solo la homepage tramite una condizione:

if(document.querySelector('#firstNumber') != null){

    
    // Catturiamo gli span che contengono i numeri
    let firstNumber = document.querySelector('#firstNumber');
    let secondNumber = document.querySelector('#secondNumber');
    let thirdNumber = document.querySelector('#thirdNumber');
    
    
    function createInterval(element, final, time) {
        let counter = 0;
        
        let interval = setInterval(()=>{
            if (counter < final){
                counter++;
                element.innerHTML = counter;
                
            } else {
                clearInterval(interval);
            }
        }, time)
        
    }
    
    //intersection observer
    // oggetto permette di intercettare uno o più elementi quando c'è l'intersezione tra la scrollbar e l'area visibile, ossia il puntoin cui l'elemento che stiamo osservando si trova
    
    let isChecked = false; //variabile di controllo
    
    let observer = new IntersectionObserver ( (elementi)=>{
        elementi.forEach( (elemento)=>{
            if (elemento.isIntersecting && isChecked == false){
                createInterval(firstNumber, 100, 25);
                createInterval(secondNumber, 500, 5);
                createInterval(thirdNumber, 1000, 2);
                isChecked = true;
            }
    })
})

observer.observe(thirdNumber);

//setTimeout() 
// Scatta una volta ed esegue un blocco di codice dopo un certo tempo

let loading = document.querySelector('#loading');
let pageContent = document.querySelector('#pageContent');

setTimeout( ()=>{
    pageContent.classList.remove('d-none');
    loading.classList.add('d-none');
}, 2000)


//intersection observer per animazione immagine homepage
let imgSection = document.querySelector('#imgSection');

let observerImg = new IntersectionObserver( (elementi)=>{
    elementi.forEach( (elemento)=>{
        if (elemento.isIntersecting){
            imgSection.classList.add('fadeRight')
        }
    })
})

observerImg.observe(imgSection);
}