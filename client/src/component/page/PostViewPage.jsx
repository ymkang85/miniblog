import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import axios from 'axios';

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [dataDB, setDataDB] = useState({});

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

    return (
        <Wrapper>
            <Container>
                <Button title="뒤로가기" onClick={() => {
                    navigate("/");
                }}
                />
                <PostContainer>
                    <TitleText>{dataDB.title}</TitleText>
                    <ContentText>{dataDB.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={postId} />

                <TextInput height={40} value={comment} onChange={(e) => {
                    setComment(e.target.value);
                }}
                />
                <Button title="댓글 작성하기" onClick={() => {
                    navigate("/comment-write");
                }}
                />
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