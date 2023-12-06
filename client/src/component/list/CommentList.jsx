import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import CommentListItem from './CommentListItem';

function CommentList(props) {
    const { comments } = props;
    const [dbData, setDbData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/post/${comments}`);
                setDbData(res.data || []); 
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [comments]); 
    
    return (
        <Wrapper>
            <div>
            {dbData.map((comment, index) => (
                <CommentListItem key={index} comment={comment} />
            ))}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-directon: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child){
            margin-bottom: 16px;
        }
    }
`;

export default CommentList;