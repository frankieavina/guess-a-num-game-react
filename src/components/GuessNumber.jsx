import React, {useEffect, useState} from 'react';
import Button from './Button';
import '../App.css';
import { getPlayersList } from '../utils/utils'; 

function GuessNumber() {


    const [headerTitle, setHeaderTitle] = useState('GUESS A NUMBER'); 
    const [guessesLeft, setGuessesLeft] = useState(3); 
    const [playAgain, setPlayAgain] = useState(false)
    const [background, setBackground] = useState('blue')
    const [answer, setAnswer] = useState (null);  
    const [guess, setGuess] = useState(null); 
    const [oldAnswer, setOldAnswer] = useState(); 
    const [players, setPlayers] = useState([]);
    const [guessButtons, setGuessButtons] = useState([
        {id:0, disable: false},
        {id:1, disable: false},
        {id:2, disable: false},
        {id:3, disable: false},
        {id:4, disable: false},
        {id:5, disable: false},
        {id:6, disable: false},
        {id:7, disable: false},
        {id:8, disable: false},
        {id:9, disable: false}]);

    // run only on the first render and any time dependency value changes 
    useEffect(() => {
        // fetch/get list of players from database 
        getPlayersList().then((data) => {
            setPlayers(data); 
            console.log(data)
        })
        //get new number
        setAnswer(Math.floor(Math.random()*10)); 
    }, [playAgain])

    useEffect(() => {
        // when you run out of guesses
        if(guessesLeft === 0){
            setHeaderTitle('GAME OVER: YOU LOST')
            setOldAnswer(answer);  
            setPlayAgain(true);
            setBackground('red');
        }
    },[guessesLeft])

    const submittedGuess = (guess) =>{

        console.log(answer)
        setGuess(guess);
        setGuessesLeft(previousState => previousState -1);

        if( guessesLeft > 0){
            //check if you won if so Game Over: You Won.
            if(guess === answer){
                setHeaderTitle('GAME OVER: YOU WON!') 
                setBackground('green');
                setOldAnswer(answer); 
                setPlayAgain(true);
            }
            else{
                // and gray out the number selected 
                let disableButton = {id:guess, disable:true}; 
                //---Functional Update: If the new state is computed using the previous state, you can pass a function to setState.
                // The function will receive the previous value, and return an updated value. 
                //----The useState() functional updates form calls a function and passes it the previous state. The Array.map() 
                //function returns a new arrays with the updated values. 
                setGuessButtons((previousState)=>previousState.map((button) =>
                    (button.id == guess ?  disableButton: button)
                ));
                setBackground('orange');
            } 
        }

    }

    // click handler for playing again. reset all variables and buttons for new game
    const playAgainClicked = () => {
        setPlayAgain(false);
        setGuessesLeft(3);
        setBackground('blue'); 
        setHeaderTitle('GUESS A NUMBER'); 
        setGuess(null);
        // enable all buttons
        setGuessButtons(previousState => previousState.map((button) =>
            ({id: button.id, disable: button.disable=false})
        )); 
    }

  return (
    <div className='page' style={{backgroundColor:`${background}`}}>
        <div className='title'>
            <h1>{headerTitle}</h1>
        </div>
        <div className='answerGuesses'>
            {(!playAgain)?(
                <p>Guesses Left:{guessesLeft}/3</p>
            ):(
                <p>The answer was {oldAnswer}...</p>
            )}
        </div>
            {playAgain?(
                <Button onClick={playAgainClicked}>Play Again</Button>
            ):(
                <div className='buttons'>
                    {guessButtons.map((button) => (
                        <Button disable={button.disable} onClick={() => submittedGuess(button.id)}>{button.id}</Button>
                    ))}
                </div>

            )}
    </div>

  )
}

export default GuessNumber