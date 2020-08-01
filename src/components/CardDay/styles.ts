import styled, { css } from 'styled-components';

interface IPropsContainer {
  selected: boolean;
}
export const Container = styled.div<IPropsContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 105px;
  height: 130px;
  background: #fff;
  border-radius: 12px;

  img {
    width: 50px;
    height: 50px;
    margin: 5px 0;
  }

  span + span {
    margin-left: 8px;
  }

  & + div {
    margin-left: 12px;
  }

  ${props =>
    props.selected &&
    css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin-top: -10px;
    `}
`;
