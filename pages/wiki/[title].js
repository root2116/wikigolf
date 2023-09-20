
import { useRouter } from 'next/router'
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import Header from '../Header.js';
import GameFooter from '../GameFooter.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const extractHtmlFromResponse = (data) => {
    const pages = data.query.pages;
    const firstPageKey = Object.keys(pages)[0];
    const revisions = pages[firstPageKey].revisions;

    if (revisions && revisions.length > 0) {
        return revisions[0]['*'];
    }
    return '';
};



const Wiki = () => {
    const router = useRouter();
    const [startWord, setStartWord] = useState('');
    const [endWord, setEndWord] = useState('');
    const [content, setContent] = useState('');
    const title = router.query.title;
    const [open, setOpen] = useState(false);

    const [count, setCount] = useState(null);
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const wordlist = localStorage.getItem('wordlist');
            const currentCount = wordlist ? wordlist.split(',').length - 1 : 0;
            setCount(currentCount);
        }
    }, []);
    

    useEffect(() => {
        setStartWord(localStorage.getItem('start'));
        setEndWord(localStorage.getItem('end'));
        
        
        if (title) {
            const prevWord = localStorage.getItem('wordlist').split(',').pop();
            if(prevWord){
                if(prevWord != title){
                    localStorage.setItem('wordlist', localStorage.getItem('wordlist') + ',' + title);
                }
            } else{
                localStorage.setItem('wordlist', title);
            }

            setCount(localStorage.getItem('wordlist').split(',').length - 1);

            if(title == endWord){
                console.log(endWord);
                setOpen(true);
            } else{
                // Wikipedia APIを叩く
                const fetchContent = async () => {
                    try {
                        console.log(title);
                        const response = await axios.get(`https://anpangames.com:3003/?title=${title}`);
                        console.log(response);

                        setContent(response.data);
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                fetchContent();
            }
        }
    }, [title]);

    return (
        <div>
            <Header />
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ height: '50px'}}></div>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
                
            </div>
            <GameFooter 
            count={count}
            start={startWord}
            end={endWord}
            />

            <Dialog open={open}>
                <DialogTitle className="external">おめでとうございます！</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {count}回でゴールしました！
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => { setOpen(false); router.push('/'); }}>OK</button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default Wiki;

