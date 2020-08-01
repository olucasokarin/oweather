import styled from 'styled-components';

interface IPropsButton {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;

  max-width: 1300px;
  width: 100%;
  margin: 30px auto;
`;

export const ContainerInfo = styled.div`
  padding: 20px;
`;

export const NameInfo = styled.div`
  margin: 20px 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    border: 0;
    background: 0;
    color: #b2b2b2;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 55px;

  min-width: 786px;

  span {
    font-size: 18px;
  }
`;

export const ContainerListCity = styled.div`
  background: #fff;
  /* height: calc(100vh - 55px); */
  margin: 0 auto;

  /* max-width: 375px; */
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-left: 60px;

  h3 {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: row;
    margin-bottom: 45px;
    align-items: center;

    input {
      border: 0;
      padding: 5px;
      font-size: 18px;
      background: transparent;
      border-bottom: 2px solid #e5e5e5;
      width: 100%;

      &:focus {
        border-color: #3e3b47;
      }
    }

    button {
      border: 0;
      background: transparent;
      margin-left: 10px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

export const ContainerCardsDay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ContainerCardInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 18px;
`;

export const Button = styled.button<IPropsButton>`
  width: 35px;
  height: 35px;
  border: none;

  /* background: #000; */
  background: ${props => (props.selected ? '#3e3b47' : '#fff')};
  color: ${props => (props.selected ? '#fff' : '#000')};
  border-radius: 50%;

  & + button {
    margin-left: 10px;
  }
`;
