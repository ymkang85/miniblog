import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import axios from 'axios';

function PostViewPage() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [dataDB, setDataDB] = useState({});
    const [btnClick, setBtnClick] = useState(true);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    useEffect(() => {
        const fetch = () => {
            axios.get(`http://localhost:5000/${postId}`)
                .then((res) => {
                    setDataDB(res.data[0]);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        fetch();
    }, []);

    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        submitComment(comment);
    }

    const submitComment = (comment) => {
        axios.post('http://localhost:5000/comment-write', {
            id: postId,
            content: comment
        })
            .then((res) => {
                console.dir(res);
                navigate(`/post/${postId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClick = () => {
        setBtnClick(prevState => {
            return !prevState;
        });
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        handleUpdate(title, content);
    }
    
    const handleUpdate = (title, content) => {
        axios.post(`http://localhost:5000/update/${postId}`, {
            title : title ||   dataDB.title,
            content : content || dataDB.content
        })
        .then((res) => {
            console.dir(res);       
            setBtnClick(false);         
            navigate(`/post/${postId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDelete = () => {
        if (window.confirm("삭제할 경우 해당 글의 댓글도 모두 삭제됩니다. 정말 삭제하시겠습니까?")) {
            axios.post(`http://localhost:5000/delete`, {
                id: postId
            })
                .then((res) => {
                    console.dir(res);
                    navigate(`/post/${postId}`);
                })
                .catch((err) => {
                    console.log(err);
                });
            alert("모두 삭제가 되었습니다.");
        } else {
            alert("삭제를 취소합니다.");
            return;
        }
    }


    return (
        <Wrapper>
            <Container>
                <Button title="뒤로가기" onClick={() => {
                    navigate("/");
                }}
                />
                <PostContainer>
                    {btnClick ? (
                        <>
                            <TitleText>{dataDB.title}</TitleText>
                            <ContentText>{dataDB.content}</ContentText>
                            <Button title="수정" onClick={handleClick} />
                            <Button title="삭제" onClick={handleDelete} />
                        </>
                    ) : (
                        <>
                            <form method='post' onSubmit={handleUpdateSubmit}>
                                <textarea style={{ width: "400px", height: "40px", fontSize: "16px" }} onChange={(e) => { setTitle(e.target.value); }} >{dataDB.title}</textarea>
                                <textarea style={{ width: "400px", height: "40px", fontSize: "16px" }} onChange={(e) => { setContent(e.target.value); }} >{dataDB.content}</textarea>
                                <div>
                                    <Button title="저장" type="submit" />
                                    <Button title="취소" onClick={handleClick} />
                                </div>
                            </form>
                        </>
                    )}
                </PostContainer>                
                <form method='post' onSubmit={handleSubmit}>
                    <Button title="댓글 작성하기" type="submit" />
                    <br />
                    <br />
                    <TextInput height={40} value={comment} onChange={(e) => {
                        setComment(e.target.value);
                    }} />
                </form>
                <CommentLabel>전체 댓글</CommentLabel>
                <CommentList comments={postId} />
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled.div`
                padding: 16px;
                width: calc(100%-32px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                `;

const Container = styled.div`
                width: 100%;
                max-width: 720px;

    & > *:not(:last-child){
                    margin-bottom : 16px;
            }
                `;

const PostContainer = styled.div`
                padding: 8px 16px;
                border: 1px solid grey;
                border-radius: 8px;
                `;

const TitleText = styled.p`
                font-size: 28px;
                font-weight: 500;
                `;

const ContentText = styled.p`
                font-size: 20px;
                line-height: 32px;
                white-space: pre-wrap;
                `;

const CommentLabel = styled.p`
                font-size: 16px;
                font-weight: 500;
                `;

export default PostViewPage