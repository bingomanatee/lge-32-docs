import Code                     from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";

export default ({children}) => {
  const list = React.Children.map(children, (a) => a && typeof a === 'string' ? a : '') || [];
  const text = list.join("");
  if (text) return (<div style={{backgroundColor: 'black'}}>
    <Code highlight={code => {
      try {
        return highlight(code, languages.js)
      } catch (err) {
        return code;
      }
    }}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: '1rem',
        color: 'white'
      }} value={text}>
    </Code>
  </div>);
  return '';
}
