import { ErrorElement, MusicLoader } from ".";

const Loading = ({
  children,
  isLoading,
  error,
  errorElement = <ErrorElement error={error} />,
  loadingElement = <MusicLoader />,
}) => {
  // REQUIRED FALLBACK ELEMENT
  if (isLoading) {
    return <div className="h-[80vh] w-full">{loadingElement}</div>;
  }
  if (error) {
    return errorElement;
  }
  return children;
};

export default Loading;
