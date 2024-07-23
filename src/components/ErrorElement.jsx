const ErrorElement = ({ error }) => {
  console.log(error, "error");
  return (
    <div className="text-red-600 font-bold flex items-center justify-center h-60">
      {error.status}
    </div>
  );
};

export default ErrorElement;
