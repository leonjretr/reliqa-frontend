import { Link } from "@/i18n";
import { MonoLabel } from "@/ui/components/common/MonoLabel";

type Props = {
  href: string;
  title: string;
  action: string;
};

export const StoryLink = ({ href, title, action }: Props) => (
  <Link
    href={href}
    className="bg-chalk flex items-baseline justify-between px-3.5 py-3.25 text-inherit no-underline"
  >
    <span className="text-copy font-semibold">{title}</span>
    <MonoLabel as="span" className="text-oxblood">
      {action}
    </MonoLabel>
  </Link>
);
