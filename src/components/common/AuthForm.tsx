import type { ReactNode } from "react";
import { Button } from "./Button";
import ErrorMessage from "./ErrorMessage";

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
  submitText: string;
  loadingText: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthForm = ({
  onSubmit,
  loading,
  error,
  submitText,
  loadingText,
  children,
  footer,
}: AuthFormProps) => {
  return (
    <>
      {error && <ErrorMessage message={error} />}

      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <div className="flex justify-center pt-2">
          <Button type="submit" loading={loading}>
            {loading ? loadingText : submitText}
          </Button>
        </div>
      </form>

      {footer && <div className="mt-4 text-center">{footer}</div>}
    </>
  );
};
