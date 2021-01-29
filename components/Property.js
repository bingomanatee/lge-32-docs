import styled from 'styled-components';

export default styled.section`
border-radius: 3rem;
display: grid;
padding: 1rem;
grid-column-gap: 1rem;
grid-row-gap: 0.5rem;
grid-template-columns: [start] minmax(9rem, 33%) [def] 1fr [end];
grid-auto-rows: minmax(5rem, 1fr);
text-shadow: none;
background-color: rgba(0,0,0,0.15);
color: white;
>* {
  align-self: baseline;
}
h3 {
  text-shadow: none !important;
  text-align: right;
  margin: 0;
  padding: 0;
  code {
  color: white;
  }
}
@media only screen and (max-width: 800px) {
  border-radius: 0;
  grid-template-columns: [start] 1fr [end];
  grid-auto-rows: auto;
  grid-row-gap: 0;
  h3 {
    text-align: left;
  }
}
`
