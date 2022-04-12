import firebase from './firebase'; 
import db from './firebase'; 
import { getDocs } from 'firebase/firestore/lite';
import { collection } from 'firebase/firestore';


// get a list of players from database 
const getPlayersList = async (db) => {

    const playersCol = collection(db,'Players');
    const playerSnapshot = await getDocs(playersCol);
    const playersList = playerSnapshot.docs.map(doc => doc.data());
    return playersList; 
}

export{ getPlayersList }; 