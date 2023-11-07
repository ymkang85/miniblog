import React from 'react'
import styled from 'styled-components'

function Button(props) {
    const { title, onClick } = props;
    return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

const StyledButton = styled.button`
    padding : 8px 16px;
    font-size: 16px;
    border-width : 1px;
    border-radius: 8px;
    cursor: pointer;
`;

export default Button