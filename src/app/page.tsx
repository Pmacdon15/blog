import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Home() {
  const codeString = `function add(a, b) {
    return a + b;
  }`;


  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <SyntaxHighlighter language="javascript" style={solarizedlight} showLineNumbers>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
