import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 20px 30px 0;

  width: 250px;
  height: 215px;
  background: #fff;
  border-radius: 12px;

  h4 {
    color: #b2b2b2;
    margin-bottom: 12px;
  }
  div {
    margin: auto 0;
    display: flex;
    justify-content: space-between;
    /* margin: auto 0; */

    span {
      display: flex;
      font-size: 17px;
      align-items: center;

      & + span {
        font-weight: 700;
        font-size: 22px;
      }
    }

    /* & + div {
      margin: auto 0;
    } */
  }
`;
