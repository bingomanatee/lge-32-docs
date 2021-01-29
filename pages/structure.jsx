import Layout   from "../components/Layout";
import Head     from "next/head";
import Property from "../components/Property";

export default () => (
  <Layout>
    <Head>
      <title>LGE walkthrough: Under the Hood</title>
    </Head>
    <article>
      <h1>Under the hood: the nature of ValueStreams</h1>
      <p>ValueStreams are extensions of the RxJs Observable pattern. </p>
      <div className="diagram">
        <img src="/img/streams.png"/>
      </div>
      <h2>The RxJS family tree</h2>
      <p>Looking Glass classes inherit from a deep tree of RxJS functionality:</p>
    <h3>Observables</h3>
      <p>Observables are at their root extremely simple: they
        are objects that emit values, synchronously, over time, until (if ever) they complete or error out.
        What exactly is emitted can be anything, even the same thing over and over.
        They can emit no value, one value, or bunches of values.</p>
      <p>You can <code>.subscxribe(onChange, onError, onComplete)</code> to Observables at any point and listen to all <i>subsequent</i> emitted value.</p>
      <h3>Subjects</h3>
      <p>Subjects are Observables with a <code>.next(value)</code> method that you can use to externally set the next value,
      which is immediately emitted to all subscribers.</p>
      <h3>BehaviorSubjects</h3>
      <p>BehaviorSubjects start with a value. Unlike their parents, you always get the latest value as soon as you
      subscribe to a BehaviorSubject. In fact you can get the latest value from a BehaviorSubject by checking its <code>.value</code> property.</p>
      <h2>The Looking Glass Engine classes</h2>
      <h3>ValueStreams</h3>
      <p>ValueStreams effectively extends the BehaviorSubject. Additionally it has extra functionality:</p>
      <ul>
        <li><b>actions:</b> You can define actions which are functions (accessed off the <code>.do</code> property) that receive
        the stream as its first parameter, and any following parameters are passed through from the call.</li>
        <li><b>filter:</b> You can define a pre-next filter that pre-processes any value; useful, for instance, for ensuring
        that arrays or objects are unique with each emission, or that the proper type (number, string, etc.) is emitted. You can even
        throw from the filter to reject a value without short terminating the ValueStream.</li>
        <li><b>Event Stages</b> Processing actions and the next update cycle can pass through multiple stages, any of which
          can be listened to and used to mutate the input/output; more on this later.</li>
      </ul>
      <h3>ValueStores</h3>
      <p>ValueStores are ValueStreams that have a collective object (map or Object) whose named properties are updated via a collection
      of streams -- specifically, BehaviorSubjects, by default. This class is abstract; it has two usable child classes,
        <b>ValueStoreMap</b> and <b>ValueStoreObject</b></p>
      <p>You can inject a custom stream for any named property to add extra functionality or behavior to a specific property.</p>
      <p>additionally for each named stream, you get a free setter in the <code>.do</code> colletion. For instance if yo have a
      ValueStore with a <code>count</code> property, you can call <code>myStream.do.setCount(value)</code> to send a next value to the
      <code>count</code> stream, thus updating the root value of the ValueStore</p>
    </article>
  </Layout>
);
