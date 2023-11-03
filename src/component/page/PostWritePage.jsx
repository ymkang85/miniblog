import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";

function PostWritePage(props) {
    const navigate = useNavigate();

    const { title, setTitle } = useState("");
    const { content, setContent } = useState("");

    return (
        <Wrapper>
            <Container>
                <TextInput height={20} vlaue={title} onChange={(e) => {
                    setTitle(e.target.vlaue);
                }}
                />

                <TextInput height={480} vlaue={content} onChange={(e) => {
                    setContent(e.target.vlaue);
                }}
                />

                <Button title="글 작성하기" onClick={() => {
                    navigate("/");
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

    & > * {
        :not(:last-child){
            margin-bottom: 16px;
        }
    }
`;

export default PostWritePage