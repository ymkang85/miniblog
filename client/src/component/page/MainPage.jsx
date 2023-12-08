import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import PostList from "../list/PostList";
import Button from "../ui/Button";
import axios from "axios";

function MainPage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:5000");
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, []);

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Container>
                <Button title="글 작성하기" onClick={() => {
                    navigate("/post-write");
                }} />
                <PostList posts={messages} key={0} onClickItem={(item) => {
                    navigate(`/post/${item.id}`);
                }} />
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding : 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & {
        :not(:last-child){
            margin-bottom : 16px;
            }
        }
`;

export default MainPage