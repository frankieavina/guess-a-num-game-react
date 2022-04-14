import React, {useEffect, useState} from 'react';
import Button from './Button';
import '../App.css';
import { collection,query,onSnapshot, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Players from './Players';
import { async } from '@firebase/util';

const q = query(collection(db,'Players')); 


function GuessNumber() {

    const [headerTitle, setHeaderTitle] = useState('GUESS A NUMBER'); 
    const [guessesLeft, setGuessesLeft] = useState(3); 
    const [playAgain, setPlayAgain] = useState(false)
    const [background, setBackground] = useState('blue')
    const [answer, setAnswer] = useState (null);  
    const [guess, setGuess] = useState(null); 
    const [count, setCount] = useState(0);
    const [playerName, setPlayerName] = useState(''); 
    const [oldAnswer, setOldAnswer] = useState(); 
    const [players, setPlayers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [selected, setSelected] = useState(''); 
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
        //get new number
        setAnswer(Math.floor(Math.random()*10)); 
    }, [playAgain])

    // check guesses left if 0 you lost 
    useEffect(() => {
        // when you run out of guesses
        if(guessesLeft === 0){
            setHeaderTitle('GAME OVER: YOU LOST')
            setOldAnswer(answer);  
            setPlayAgain(true);
            setBackground('red');
        }
    },[guessesLeft])

    // on initialization get players list from Firebase and 
    // fetch again when there's a new user
    useEffect(() => {
        onSnapshot(q,(snapshot)=>{
            setPlayers(snapshot.docs.map(doc=>({
              id: doc.id,
              data: doc.data()
            })))
       })
       console.log(players)
    },[newUser,playAgain]);

    const submittedGuess = (guess) =>{

        console.log(answer)
        setGuess(guess);
        setGuessesLeft(previousState => previousState -1);
        if(!selected){
            return alert(`Please choose a player or create a new one.`);
        }

        if( guessesLeft > 0){
            //check if you won if so Game Over: You Won.
            if(guess === answer){
                setHeaderTitle('GAME OVER: YOU WON!')
                addScoreToPlayer();  
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

    //adding new player info
    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        alert(`Hey ${newUser} you are now added to the scoreboard. Good luck!`);
        // add to database 
        addNewUser(newUser); 
        setNewUser(''); 
    }

    const handleInputChange =(e) =>{
        const { name, value } = e.target; // will have the name(yourName) and value('Frankie')
        setNewUser(value)
    }

    const addNewUser = (user) => { // adding user to DB Firebase 
        addDoc(collection(db,'Players'),{
            name: user,
            score: 0
        })
    }

    //selected player 
    const selectedPlayer = (id,name,score) => {
        console.log(id); 
        alert(`Hey ${name}. Remember to choose wisely. Good luck!`);
        setSelected(id);
        setCount(score); 
        setPlayerName(name);
    }

    //update score
    const addScoreToPlayer = async () => {
        // update it both in db and is selected useState
        setCount((previousState) => previousState+1);
        const playerRef = doc(db,"Players",`${selected}`)
        await updateDoc(playerRef,{
            score: count 
        })
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
            {(selected)?(
                <p>Playing as:<b>{playerName}</b>.</p>
            ):( <p>No player selected yet.</p>)}
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
            <h2>Scoreboard</h2>
            {players.map((player) => (
                <div className='playerTable'>
                    <Players name={player.data.name} score={player.data.score}/>
                    <button onClick={() => selectedPlayer(player.id,player.data.name,player.data.score)}>Select</button>
                </div>   
            ))}
            {/* ------------------------------------------------------------------------------ */}
            <div className='form'>
                <h2>New User</h2>
                <form onSubmit={handleFormSubmit} >
                    <div style={{padding:'1rem'}}>
                        <label htmlFor='yourUsername'>
                            Username:
                            <input
                                type="text"
                                id='yourUsername'
                                name='yourUsername'
                                placeholder="Username"
                                value={newUser}
                                onChange={handleInputChange}
                            />                            
                        </label>
                    </div>
                    <div>
                        <button type="submit">Add Player</button>
                    </div>
                </form>                
            </div>
            {/* ----------------------------------------------------------------------------------- */}
    </div>

  )
}

export default GuessNumber