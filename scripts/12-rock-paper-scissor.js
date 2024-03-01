 // ---------object for score ----------------------
  
    /*const score ={
      wins:0,
      losses:0,
      ties:0
    };*/


    
    // retriving the data from localstorage- and using default operater-------

    let score =JSON.parse(localStorage.getItem('score')) || {
      wins:0,
      losses:0,
      ties:0

    }
    updateScoreFunction();
    /*if (score === null){
      score={  
        wins:0,
        losses:0,
        ties:0
      }
      };*/

    
    
    // ------------------------auto play function--------------------------------------
    let autoplaying = false;//creating autoplay variableif is not playing to start playing;
    let intervalID;// to stop set interval we use clear intervalthat uses set interval id so setinterval id is stored in intervalid variable
    function autoPlay(){
      let button = document.querySelector('.js-auto');
      if(!autoplaying && button.innerHTML === 'Auto Play'){
        intervalID=setInterval(function(){
          const playerMove = pickComputerMove();
          playGame(playerMove);
  
        },1000)
        autoplaying = true;
        button.innerHTML = 'Stop play'
        

      }
      else{
        clearInterval(intervalID)
        autoplaying = false;
        button.innerHTML = 'Auto Play'
        
      }
    }
     //--------------using event listener insted of onclick for autoplay-------------------
    document.querySelector('.js-auto').addEventListener('click',()=>{
      autoPlay();
    })

   




      //--------------using event listener insted of onclick for rock-------------------
      document.querySelector('.js-rock-button')
      .addEventListener('click',() =>{
        playGame('rock')
      })


       //--------------using event listener insted of onclick for paper-------------------

      document.querySelector('.js-paper-button')
      .addEventListener('click',() =>{
        playGame('paper')
      })

      //--------------using event listener insted of onclick for scissor-------------------

      document.querySelector('.js-scissor-button')
      .addEventListener('click',() =>{
        playGame('scissor')
      })


      //--------------using event listener insted of onclick for reset-------------------
      const pp = document.querySelector('.js-p');
      document.querySelector('.js-reset').addEventListener('click',()=>{
        
        pp.innerHTML = `Are you sure you want to reset the score? <button class="css-yes"  onclick="score.wins=0;
          score.losses=0;
          score.ties=0;
          localStorage.removeItem('score');
          updateScoreFunction();
          yes();

        "> Yes</button><button class="css-yes" onclick="yes(); ";>No</button>`

        

      });
      
      function yes(){
        pp.innerHTML = '';
      }
        


      

    
      document.body.addEventListener('keydown',(event) =>{
        if(event.key === 'r'){
          playGame('rock')

        }
        else if(event.key === 'p'){
          playGame('paper')
        }
        else if(event.key === 's'){
          playGame('scissor')
        }
        else if(event.key ==='a'){
          autoPlay();
        }
        else if(event.key === 'Backspace'){
           
          pp.innerHTML = `Are you sure you want to reset the score? <button class="css-yes"  onclick="score.wins=0;
          score.losses=0;
          score.ties=0;
          localStorage.removeItem('score');
          updateScoreFunction();
          yes();

        "> Yes</button><button class="css-yes" onclick="yes(); ";>No</button>`
          

        }
      })

      
      

    
   
    //------function with parameters for process to usermove/player move---------
    
    function playGame(playerMove) {
      const computerMove = pickComputerMove();
      

      let result='';
      if (playerMove === 'scissor') {
        if (computerMove === 'rock'){
          result= 'You Lose';
        }
        else if (computerMove === 'paper'){
          result='You Win';

        }
        else if (computerMove === 'scissor'){
          result='Tie';
        }
        

      }
      else if (playerMove === 'paper'){
        if (computerMove === 'rock'){
          result = 'You Win';
        }
        else if(computerMove === 'paper'){
          result = 'Tie';
        }
        else if (computerMove === 'scissor'){
          result='You Loss'
        }
      }
      else if (playerMove === 'rock'){
        if (computerMove === 'rock') {
          result='Tie';
        }
        else if (computerMove === 'paper'){
          result='You Lose';
        }
        else if (computerMove === 'scissor'){
          result='You Win';
        }
        

      }
      

      



      //------updating the score-------------
      if (result === 'You Win'){
        score.wins+=1;
      }
      else if (result === 'You Lose'){
        score.losses+=1;
      }
      else if(result === 'Tie'){
        score.ties+=1;
      }

       
      //--converting object to string using 'JSON'

      const jsonscore=JSON.stringify(score);

      //localstorage to store date pernamently-------

      localStorage.setItem('score',jsonscore);
      


      updateScoreFunction(); 

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-moves').innerHTML = `You <img class="move-icon"  src="images/${playerMove}-emoji.png"><img class="move-icon"  src="images/${computerMove}-emoji.png">Computer`

      
      

    
     


      //----display output--------------------
    /* alert(`you picked: ${playerMove}. computer picked: ${computerMove} result: ${result}, 
    wins:${score.wins},losses:${score.losses},ties:${score.ties}`);*/
    
      
     

    }
    
    function updateScoreFunction() {
      document.querySelector('.js-score')
     .innerHTML = `wins:${score.wins},losses:${score.losses},ties:${score.ties}`;

    };

   

    
    // ---------------------function FOR COMPUTERMOVE--------------------------
    function pickComputerMove () {
      const randomNumber = Math.random();
      let computerMove = '';
      
      if (randomNumber >=0 && randomNumber < 1/3) {
        computerMove = 'rock';

      }
      else if (randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
      }
      else if (randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'scissor';
      }
    return computerMove ;
    }