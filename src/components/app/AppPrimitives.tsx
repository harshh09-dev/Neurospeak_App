import { ReactNode } from "react";
import { ArrowLeft, Inbox, LoaderCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Page = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8", className)}>{children}</div>
);

export const PageHeader = ({
  title,
  description,
  back,
  action,
}: {
  title: string;
  description?: string;
  back?: boolean;
  action?: ReactNode;
}) => {
  const navigate = useNavigate();
  return (
    <header className="mb-6 flex min-w-0 items-start gap-3">
      {back && (
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back" className="-ml-2 shrink-0">
          <ArrowLeft />
        </Button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="break-words text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
};

export const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-3">
    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
  </div>
);

export const AppCard = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("rounded-lg border border-border bg-card p-4 text-card-foreground shadow-card", className)}>{children}</div>
);

export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-5 py-10 text-center">
    <Inbox className="mb-3 h-8 w-8 text-muted-foreground" aria-hidden="true" />
    <h2 className="font-semibold text-foreground">{title}</h2>
    <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export const LoadingState = ({ label = "Loading" }: { label?: string }) => (
  <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-muted-foreground" role="status">
    <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

export const ErrorState = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-5 text-center" role="alert">
    <p className="text-sm text-foreground">{message}</p>
    {onRetry && (
      <Button variant="outline" className="mt-4" onClick={onRetry}>
        <RefreshCw /> Retry
      </Button>
    )}
  </div>
);
