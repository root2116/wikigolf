
import { useRouter } from 'next/router'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/page.module.css'

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
    const [content, setContent] = useState('');
    const title = router.query.title;

    useEffect(() => {
        if (title) {
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
    }, [title]);

    return (
        <div className={styles.mwBodyContent}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    )

}

export default Wiki;

