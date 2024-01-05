import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  grid-area: start;
  display: block;
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;

  padding: 10px 40px;
  border-radius: 10px;
  background: blue;
  color: white;

  font-size: 16px;
  font-family: inherit;

  box-shadow: 0 10px #000091;

  &:hover {
    box-shadow: 0 6px #000091;
    top: 4px;
  }

  &:active {
    box-shadow: 0 2px #000091;
    top: 8px;
    transition-duration: 0.2s;
  }
`

const Button = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Button
