import { FullPageLoader } from "@/components/ui/loaders";

// This is a server component, so we can't use hooks
// The chain styling will be handled automatically in the loader
// based on URL path detection
const Loading = () => {
  return <FullPageLoader subtitle="Loading blockchain news & insights..." />;
};

export default Loading;
