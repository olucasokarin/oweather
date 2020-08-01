import styled, { css } from 'styled-components';

interface IPropsContainer {
  selected: boolean;
}
export const Container = styled.div<IPropsContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */

  padding: 0 12px;

  width: 80%;
  height: 50px;
  background: #eeeeee;
  border-radius: 12px;

  button {
    border: 0;
    background: transparent;
    margin-right: 20px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  & + div {
    margin-top: 12px;
  }

  ${props =>
    props.selected &&
    css`
      background: #f6f6f8;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}
`;
