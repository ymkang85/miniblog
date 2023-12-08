import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../ui/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CommentListItem(props) {
    const { comment } = props;
    const [btnClick, setBtnClick] = useState(true);
    const [commentData, setCommentData] = useState(comment.content);
    const { postId } = useParams();

    const handleClick = () => {
        setBtnClick(prevState => {
            console.log(!prevState);
            return !prevState;
        });
    }

    const handleDelete = () => {
        if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
            axios.post(`http://localhost:5000/comment_delete`, {
                comment
            })
                .then((res) => {
                    console.dir(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            alert("댓글이 삭제 되었습니다.");
        } else {
            alert("삭제를 취소합니다.");
            return;
        }
    }

    const handleUpdateSubmit = (e) =>{
        e.preventDefault();
        handleUpdate(commentData);
    }

    const handleUpdate = (commentData) => {
        axios.post(`http://localhost:5000/comment_update/${postId}`, {
            commentData,
            comment
        })
            .then((res) => {
                console.dir(res);
            })
            .catch((err) => {
                console.log(err);
            });

    }
    return (
        <Wrapper>
            <ContentText >
                {btnClick ? (
                    <>
                        {commentData}
                        <div style={{ width: '100%', height: '100%', marginTop: '20px', marginBottom: '0' }}>
                            <Button title="수정" onClick={handleClick} />
                            <Button title="삭제" onClick={handleDelete} />
                        </div>
                    </>
                ) : (
                    <>
                        <form method='post' onSubmit={handleUpdateSubmit}>
                            <textarea style={{ width: "400px", height: "40px", fontSize: "16px" }} onChange={(e) => { setCommentData(e.target.value); }}>{commentData}</textarea>
                            <div style={{ width: '100%', height: '100%', margin: '0' }}>
                                <Button title="저장" type="submit" />
                                <Button title="취소" onClick={handleClick} />
                            </div>
                        </form>
                    </>
                )}

            </ContentText>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: calc(100% - 32px);
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