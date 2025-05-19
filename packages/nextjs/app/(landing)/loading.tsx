import { Loading } from "~~/components/ui/loading";

export default function Page() {
  return (
    <div>
      <Loading
        title="Loading..."
        description="Please wait while we fetch the information..."
        progressText="Preparing your interface"
      />
    </div>
  );
}
