import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import Header from './Header.js';
import StartFooter from './StartFooter.js';
import { useEffect } from 'react';


export default function Home() {

    const startWord = "日向坂46";
    const endWord = "Loppi";

    useEffect (() => {
        localStorage.setItem('start', startWord);
        localStorage.setItem('end', endWord);
        localStorage.setItem('wordlist', "");
    }, [])

  return (
    <div>
        <Header />
        <StartFooter />
    </div>
  )
}
