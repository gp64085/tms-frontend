import type { FunctionComponent } from "react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  message,
  className,
}) => {
  return (
    <div
      className={`p-3 mb-4 text-sm text-red-600 rounded bg-red-50 ${className}`}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
