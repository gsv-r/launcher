import Layout from "../components/frame/layout";
import Launch from "../components/practice/launch";

export default function Practice(): React.JSX.Element {
  return (
    <Layout>
      <p className="text-neutral-500 text-md">This is the practice screen.</p>
      <div className="w-84">
        <Launch />
      </div>
    </Layout>
  );
}