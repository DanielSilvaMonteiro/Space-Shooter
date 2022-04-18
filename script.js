const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let alienInterval;
var contador = 0; 
var totalNaves = 0;

//var maiorpontos = 0;

//Condições das teclas selecionadas
function flyAhip(event){
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    }else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    }else if(event.key === " "){
        event.preventDefault();
        fireLaser();
    }
}

//função de subir
function moveUp(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px"){
        return
    }else{
        let position = parseInt(topPosition);
        position -= 10;
        yourShip.style.top = `${position}px`;
    }
}

//Função de descer
function moveDown(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "550px"){
        return
    }else {
        let position = parseInt(topPosition);
        position += 10;
        yourShip.style.top = `${position}px`;
    }   
}

//Funcionalidade de tiro
function fireLaser(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition -20}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

//Movimento do laser
function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca o src da imagem
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.add('dead-alien');
                alien.classList.remove('alien');            
             
            }
        },10);

        if(xPosition >= 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

//Função para selecionar naves Inimigas aleatorio
function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//função para movimentar inimigos
function moveAlien(alien){
    let moveAlienInterval = setInterval(()=>{
    let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
      if(xPosition <= 50){
         if(Array.from(alien.classList).includes('dead-alien')){
                alien.remove();
                contador += 100;
                totalNaves ++;
         }else{
                gameOver();
               alien.remove();
            }
      }else{
            alien.style.left = `${xPosition -3}px`; //para o alen continuar andando
       }
    }, 30);
}

//Função colisão tiro inimigo
function checkLaserCollision(laser, alien){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop -20;

    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop -30;

    if(laserLeft != 340 && laserLeft + 40 >= alienLeft){
        if(laserTop <= alienTop && laserTop >= alienBottom){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

//inicio do jogo
startButton.addEventListener('click', (event)=>{
    playGame();
});

//Inicio Jogo
function playGame(){
startButton.style.display ='none';
instructionsText.style.display='none';
window.addEventListener('keydown', flyAhip);
alienInterval = setInterval(()=>{
    createAliens();
}, 2000);
}

//função de game over
function gameOver(){
    window.removeEventListener('keydown', flyAhip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien)=> alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser)=>laser.remove());
    setTimeout(() => {
        alert('GAME OVER \n\n Total de naves abatidas: '+ totalNaves +'\n Sua pontuação foi: ' + contador);
        yourShip.style.top ="250px";
        startButton.style.display ="block";
        instructionsText.style.display ="block";
       // maiorpontos = contador;
        contador = 0;
        totalNaves = 0;
    });

}

/*Escrita maquina de escrever*/
function typeWrite(elemento){
    const textoArray = elemento.innerHTML.split(''); //split para criar um array de letras
    elemento.innerHTML = '';
    //console.log(textoArray);
    textoArray.forEach((letra, i)=>{
       // console.log(letra);
      //  console.log(i);
      setTimeout(()=>{
        elemento.innerHTML += letra;
      },125*i)
    });
}
const titulo = document.querySelector('.paragrafo');
//console.log(titulo);
typeWrite(titulo);