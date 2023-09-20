import { Typography } from '@mui/material';
import Link from 'next/link'
import { useEffect } from 'react';


function GameFooter(props) {

    
    return (
        <footer>
            <Typography>{props.start} → {props.end}：{props.count}回</Typography>
            <Link href="/" style={{ "marginLeft": "auto" }} className="external">
                <button className="red-button" style={{ "width": "150px", "padding": "10px", "fontSize": "120%" }}>終了</button>
            </Link>
        </footer>
    )
}

export default GameFooter;