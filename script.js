let board = document.querySelector("#board");
let scorec = document.querySelector(".scorec");
let heigscore = document.querySelector(".heigscore");
let score = 0;
let speed =6;
let lastPaintTime = 0;

let inputDir = {x:0,y:0};
let snakeArr = [  {x:13,y:15},  ];
let food =  {x:4 ,y:7};
let hscore = 0;

scorec.innerHTML = score;


function isCollide(snake){
    // if snake bump in to yourself 
    for(let i=1; i< snakeArr.length; i++){
      if(snake[i].x ===  snake[0].x && snake[i].y === snake[0].y){
        return true;
      }
    }       
   if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >=18  || snake[0].y <=0){
    return true;
   }

   return false;
}

function saveheight(ns , hs){
    JSON.stringify(localStorage.setItem("snakedata",ns));

}

//Game  Function start here 
function main(ctime){
    window.requestAnimationFrame(main);
    heigscore.innerText = localStorage.getItem("snakedata");
   

    if((ctime -lastPaintTime)/1000 < 1/speed){
        return ;
    }
    //  console.log(ctime);
    lastPaintTime = ctime;

    gameEngine();
   
}

function gameEngine(){

    // 1.Update the snake arr and Food

    if(isCollide(snakeArr)  === true){
        inputDir ={x:0,y:0};
        alert("Game is over , press any key to start the game!");
        snakeArr = [ {x:13,y:15},];
        score= 0; 
        scorec.innerHTML = score;
        
    }

    // If snake have eaten the food , increment the score and regenerte the food 
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        score++;
        scorec.innerHTML = score;
        hscore = JSON.parse(localStorage.getItem("snakedata")) ;
        if(score > hscore){

            console.log(score ,hscore);
            saveheight(score ,hscore);
        }

        snakeArr.unshift({x:snakeArr[0].x + inputDir.x ,y : snakeArr[0].y + inputDir.y});
        let a=2;
        let b= 16;
        food = {x: Math.round(a + (b-a) * Math.random())  , y: Math.round(a + (b-a) * Math.random())};
        console.log(food);
    }   

    // Moving the snake 
    for(let i=snakeArr.length -2 ; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
 

    // 2.Display the snake and food 

    board.innerHTML = "";
    // display the snake 
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart =e.x;
        if(index == 0){
        snakeElement.classList.add('head');
            
        }else{
        snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });


    // display the food 8
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// Main Logice start here 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    
    inputDir = {x:0,y:0};// start the game 
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;    
            inputDir.y = -1;    
            break;
        case "ArrowDown":
            inputDir.x = 0;    
            inputDir.y = 1;   
            break;
        case "ArrowLeft":
            inputDir.x = -1;    
            inputDir.y = 0;   
            break;
        case "ArrowRight":
            inputDir.x = 1;    
            inputDir.y = 0;   
            break;        
        default:
            break;
    }

});