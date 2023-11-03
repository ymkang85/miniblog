import React from 'react'
import styled from 'styled-components';
import CommentListItem from './CommentListItem';

function CommentList(props){
    const { comments } = props;

    return (
        <Wrapper>
            {comments.map((comment, index) =>{
                return <CommentListItem key={comment.id} comment = {comment} />
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-directon: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        : not(:last-child){
            margin-bottom: 16px;
        }
    }
`;

export default CommentList;