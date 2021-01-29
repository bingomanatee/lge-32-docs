import styled from "styled-components";

export default styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      justify-content: center;
      align-items: center;
      display: flex; 
    }
    
    .logo img {
      width: 8rem;
      height: 8rem;
      @media only screen and (min-width: 500px) and (max-width: 800px) {
        width: 6rem;
        height: 6rem;
      }
      @media only screen and (max-width: 500px) {
          width: 4rem;
          height: 4rem;
      }
    }
    .spacer {
      flex: 0;
      flex-basis: 3rem;
    }
    .title {
      flex-grow: 1;
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      h1 {
          font-family: 'Oswald', sans-serif;
          font-size: 3rem;
          color: black;
          font-weight: 300;
          text-transform: uppercase;
          text-shadow: 5px 1px 30px rgba(255, 255, 255, 0.25);
      }
      @media only screen and (min-width: 500px) and (max-width: 800px) {
      h1 {
          font-size: 2rem;
      }
    }
    
    @media only screen and (max-width: 500px) {
      h1 {
          font-size: 1.5rem;
      }
    }    
  |
`
