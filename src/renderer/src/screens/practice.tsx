import Layout from "../components/frame/layout";
import Preview from "../components/practice/preview";
import Launch from "../components/practice/launch";

import PreviewBike from "../assets/bike_preview.png";
import PreviewTrack from "../assets/track_preview.png";

export default function Practice(): React.JSX.Element {
  return (
    <Layout>
      <div className="grid grid-cols-[22vw_25vw_1fr] gap-2 h-full overflow-hidden items-start">
        <Preview src={PreviewBike} name="Aprilia RS-GP 2025" />
        <Preview src={PreviewTrack} name="Red Bull Ring" cover={true} />
        <div>
          {/* weather */}
        </div>
        <Launch />
      </div>
    </Layout>
  );
}