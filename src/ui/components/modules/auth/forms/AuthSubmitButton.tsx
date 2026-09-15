import { Button, Spinner } from "@/ui/components/lib/shadcn";

type Props = {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
};

export const AuthSubmitButton = ({ isSubmitting, label, loadingLabel }: Props) => (
  <Button
    type="submit"
    disabled={isSubmitting}
    className="hover:bg-auth-brass-600 rounded-button h-13 text-base font-medium active:scale-97"
  >
    {isSubmitting && <Spinner />}
    {isSubmitting ? loadingLabel : label}
  </Button>
);
