import React, { useRef, useState } from 'react'

const Teste = () => {
   const passwordRef = useRef('');
  const generatePasswords = (passLength) => {
    let password = '';
    const allChars = 'aABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i  = 0; i < passLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password;
  }

  const [newPass, setNewPass] = useState('');
  const [randomWord, setRandomWord] = useState('');

  const handleClick  = () => {
    const newPass = generatePasswords(Math.floor(Math.random() * 10) + 11)
    setNewPass(newPass);
    passwordRef.current.textContent = newPass;
    const myMantra = 'Im going to make much money working as a dev'
    const  words = myMantra.split(' ');
    const randomWord = words[Math.floor(Math.random() * words.length)]
    setRandomWord(randomWord);
}

  return (
    <div>
        <p ref={passwordRef}></p>
        <p>{newPass}</p>
        <p>{randomWord}</p>
        <button onClick={handleClick}>gerar</button>
    </div>
  )
}

export default Teste;
