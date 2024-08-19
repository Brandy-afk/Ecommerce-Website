interface ErrorPageProps {
  error: string;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div>Error - {error}</div>;
}
