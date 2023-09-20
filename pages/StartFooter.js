import Link from 'next/link'
import { useEffect } from 'react';
import { useState } from 'react';

function StartFooter(){

    const [startWord, setStartWord] = useState('');
    useEffect (() => {
        setStartWord(localStorage.getItem('start'));
    }, [])
    

    return (
        <footer>
            <Link href={`/wiki/${startWord}`} style={{"marginLeft":"auto"}} className="external">
                <button className="green-button" style={{ "width": "150px", "padding": "10px", "fontSize": "120%" }}>スタート</button>
            </Link>
        </footer>
    )
}

export default StartFooter;