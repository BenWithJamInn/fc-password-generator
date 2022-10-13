import React, {useEffect, useState} from 'react';
import styles from './Generator.module.scss'
import {Checkbox, FormControlLabel, Slider} from "@mui/material";

const maxChar = 16
const minChar = 6

const lowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const upperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const numbers = ["0","1","2","3","4","5","6","7","8","9"]
const symbols = ["!","\"","#","$","%","&","'","*","+",",","-",".","ඞ"]

const Generator = () => {
  const [generatedPassword, setGeneratedPassword] = useState<string>("")

  const [charLength, setCharLength] = useState<number>(8)
  const [isLowerCase, setIsLowerCase] = useState<boolean>(true)
  const [isUpperCase, setIsUpperCase] = useState<boolean>(true)
  const [isNumbers, setIsNumbers] = useState<boolean>(true)
  const [isSymbols, setIsSymbols] = useState<boolean>(true)

  useEffect(() => {
    let charPool: string[] = []
    if (isLowerCase) {
      charPool = charPool.concat(lowerCase)
    }
    if (isUpperCase) {
      charPool = charPool.concat(upperCase)
    }
    if (isNumbers) {
      charPool = charPool.concat(numbers)
    }
    if (isSymbols) {
      charPool = charPool.concat(symbols)
    }

    const password: string[] = []
    for (let i = 0; i < charLength; i++) {
      password.push(charPool[Math.floor(Math.random() * charPool.length)])
    }
    setGeneratedPassword(password.join(""))
    // console.log(password);
  }, [
    charLength,
    isLowerCase,
    isUpperCase,
    isNumbers,
    isSymbols
  ])

  return (
    <div className={styles.genBox}>
      {generatedPassword}
      <Slider
        value={charLength}
        onChange={(e, val) => setCharLength(val as number)}
        step={0.00000001}
        max={maxChar}
        min={minChar}
      />
      <div className={styles.checkBoxContainer}>
        <FormControlLabel control={<Checkbox value={isLowerCase} onChange={(e, val) => setIsLowerCase(val)} defaultChecked />} label="Include Lower Case Letters" />
        <FormControlLabel control={<Checkbox value={isUpperCase} onChange={(e, val) => setIsUpperCase(val)} defaultChecked />} label="Include Upper Case Letters" />
        <FormControlLabel control={<Checkbox value={isNumbers} onChange={(e, val) => setIsNumbers(val)} defaultChecked />} label="Include Numbers" />
        <FormControlLabel control={<Checkbox value={isSymbols} onChange={(e, val) => setIsSymbols(val)} defaultChecked />} label="Include Symbols" />
      </div>
    </div>
  );
};

export default Generator;
