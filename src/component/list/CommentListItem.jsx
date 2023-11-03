import React from 'react'
import styled from 'styled-components'

function CommentListItem(props){
    const { comment } = props;
    return(
        <Wrapper>
            <ContentText>{comment.content}</ContentText>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: cacl(100% - 32px);
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover{
        background: lightgrey;
    }
`;

const ContentText = styled.p`
    font-size: 16px;
    white-space: pre-wrap;
`;

export default CommentListItem