import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */

  padding: 20px 30px;

  width: 250px;
  height: 215px;
  background: #fff;
  border-radius: 12px;

  h4 {
    color: #b2b2b2;
  }

  span {
    margin: auto 0;
  }

  div {
    display: flex;
    align-items: center;

    margin: auto 0;
    font-size: 22px;
    font-weight: 700;

    span {
      margin-left: 22px;
    }
  }

  img {
    width: 50px;
    height: 47px;
  }
`;
