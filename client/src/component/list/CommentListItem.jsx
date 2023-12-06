import React from 'react'
import styled from 'styled-components'
import Button from '../ui/Button';

function CommentListItem(props) {
    const { comment } = props;
    return (
        <Wrapper>
            <ContentText >
                {comment.content}
                <div style={{width:'100%', height:'100%', marginTop:'20px', marginBottom:'0'}}>

                    {/* 수정,삭제작업필요! */}
                    <Button title="수정" />
                    <Button title="삭제" />
                    {/* 수정,삭제작업필요! */}
                    
                </div>
            </ContentText>
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