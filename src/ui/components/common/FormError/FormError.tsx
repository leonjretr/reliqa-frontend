type Props = {
  message?: string;
};

export const FormError = ({ message }: Props) =>
  message ? (
    <p role="alert" className="text-oxblood font-kept-mono text-caption mt-2.5 tracking-wider">
      {message}
    </p>
  ) : null;
