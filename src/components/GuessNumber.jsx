import React, {useEffect, useState} from 'react';
import Button from './Button';
import '../App.css';

function GuessNumber() {


    const [headerTitle, setHeaderTitle] = useState('GUESS A NUMBER'); 
    const [guessesLeft, setGuessesLeft] = useState(3); 
    const [playAgain, setPlayAgain] = useState(false)
    const [background, setBackground] = useState('blue')
    const [answer, setAnswer] = useState (null);  
    const [guess, setGuess] = useState(null); 

    // run only on the first render and any time dependency value changes 
    useEffect(() => {
        setAnswer(Math.floor(Math.random()*10)); 
    }, [playAgain])

    const submittedGuess = (guess) =>{

        setGuess(guess);
        setGuessesLeft(guessesLeft-1);

        if( guessesLeft > 1){
            //check if you won if so Game Over: You Won.
            if(guess === answer){
                setHeaderTitle('GAME OVER: YOU WON!') 
                setPlayAgain(true);
            }
            else{
                // and gray out the number selected 
                                
            } 
        }

        //when you run out of guesses 
        else 
        {
            // You ran out of Guesses Game Over: You Lost 
            setHeaderTitle('GAME OVER: YOU LOST')
            setPlayAgain(true);
        }

    }

    const playAgainClicked = () => {
        // reset and hide play again button
        setPlayAgain(false);
        setGuessesLeft(3);
        setHeaderTitle('GUESS A NUMBER'); 
        setGuess(null);
    }

  return (
    <div className=''>
        <div className='title'>
            <h1>{headerTitle}</h1>
        </div>
        <div className='answerGuesses'>
            {(!playAgain)?(
                <p>Guesses Left:{guessesLeft}/3</p>
            ):(
                <p>The answer was {answer}...</p>
            )}
        </div>
            {playAgain?(
                <Button onClick={playAgainClicked}>Play Again</Button>
            ):(
                <div className='buttons'>
                    <Button onClick={() => submittedGuess('0')}>0</Button>
                    <Button onClick={() => submittedGuess(1)}>1</Button>
                    <Button onClick={() => submittedGuess(2)}>2</Button>
                    <Button onClick={() => submittedGuess(3)}>3</Button>
                    <Button onClick={() => submittedGuess(4)}>4</Button>
                    <Button onClick={() => submittedGuess(5)}>5</Button>
                    <Button onClick={() => submittedGuess(6)}>6</Button>
                    <Button onClick={() => submittedGuess(7)}>7</Button>
                    <Button onClick={() => submittedGuess(8)}>8</Button>
                    <Button onClick={() => submittedGuess(9)}>9</Button>
                </div>

            )}
    </div>

  )
}

export default GuessNumber