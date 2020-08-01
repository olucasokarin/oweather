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

  div {
    margin: auto 0;
    font-size: 36px;
    font-weight: 700;

    span + span {
      font-size: 22px;
      margin-left: 8px;
    }
  }
`;
