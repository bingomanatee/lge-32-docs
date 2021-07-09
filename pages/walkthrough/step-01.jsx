import Layout                   from "../../components/Layout";
import Head                     from "next/head";
import Property                 from "../../components/Property";
import NextButton               from "../../components/NextButton";
import Code                     from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import CodeDisplay              from "../../components/CodeDisplay";

export default () => (
  <Layout>
    <Head>
      <title>LGE walkthrough: page 1</title>
    </Head>
    <article>
      <h1>Walkthrough</h1>
      <h2>Working with a ValueStream.</h2>

      <p>We're going to develop a dashboard using Looking-glass-engine.</p>

      <p>The first example will be a POC chart; not necessarily the expected first step
        towards creating a dashboard, but it is the first "Proof of Concept" part that the client asks for.</p>

      <h2>The <code>ValueStream</code></h2>

      <p>A ValueStream is a single-value stream; it is in reality a lot like a <a>BehaviorSubject</a> in RXJS</p>
      <iframe src="https://codesandbox.io/embed/charting-example-g04kc?codemirror=1&fontsize=14&hidenavigation=1&theme=dark"
        style={{width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
        title="looking glass engine - login demo part 1 - a simple graph"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>

      <p>First let's set up a basic series array that we will echo through the graph. </p>
<CodeDisplay>{`
export default function App() {
  const [series, setSeries] = useState([]);
`}
</CodeDisplay>
      <p>Then we'll seed the data through the series data by creating a ValueStream that returns an array of data values.</p>
      <CodeDisplay>
        {`  useEffect(() => {
    let store = new ValueStream([
      { date: "2020-08-20", amount: 2 },
      { date: "2020-08-21", amount: 47 },
      { date: "2020-08-22", amount: 33 }
    ]);
    const sub = store.subscribe(setSeries);
        `}
      </CodeDisplay>
      <p>Lastly, we'll create an update function that pumps out random data. (Normally this would be an async data poll...
      but it doesn't matter for this use case that it is not; it just adds data every 0.8 seconds.</p>
      <CodeDisplay>
        {`
    const update = () => {
      const next = [...store.value];
      let lastData = next[next.length - 1];
      const { date, amount } = lastData;
      let dateObj = dayjs(date);
      let nextDay = dateObj.add(1, "day");
      const record = {
        date: nextDay.format("YYYY-MM-DD"),
        amount: clamp(Math.random() * 20 - 10 + amount, 0, 100)
      };

      next.push(record);
      store.next(next);
      while (next.length > 8) next.shift();
      setTimeout(update, 800);
    };

    update();

    return () => sub.unsubscribe();
  }, []);
        `}
      </CodeDisplay>
      <p>The last line of the effect handler unsubscribes our subscription
        to the store when the component goes out of scope. </p>
      <p>Lastly, we will render the chart, using series as the data.
        (note the <code>data={`{series}`}</code> property)</p>
      <CodeDisplay>
        {` 
  return (
    <Grommet theme={theme}>
      <Grid rows={["auto", "1fr"]} fill="true">
        <Main
          id="main-item"
          background="neutral-3"
          align="stretch"
          overflow="hidden"
        >
          <Heading level={1}>Sample Graph</Heading>
        </Main>
        (
        <DataChart
          data={series} 
          flex="1"
          size={{ height: 500, width: "fill" }}
          series={["date", { property: "amount", prefix: "$" }]}
          chart={[{  property: "amount",  type: "line", color: "accent-2", thickness: "2" }]}
          guide={{ y: { granularity: "fine" } }}
        />
      </Grid>
    </Grommet>
  );
`}</CodeDisplay>

      <p>It may seem like a useless piece of middleware at this point - you might as well dump the data
        directly into the series collection directly - but as these examples get more involved,
        understanding the subcription process in a simple form will come in handy.</p>

      <NextButton href={'/walkthrough/step-02'}>
        Let's create a simple panel set
      </NextButton>
    </article>
  </Layout>)
