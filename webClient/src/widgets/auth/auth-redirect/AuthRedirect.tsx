import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export type AuthRedirectProps = {
    question?: string;
    linkText: string;
    to: string;
    isButton?: boolean;
};

export const AuthRedirect = ({
    question,
    linkText,
    to,
    isButton = false,
}: AuthRedirectProps) => {
    return (
        <div className="flex gap-2 justify-items-start">
            {question && (
                <span className="text-sm text-muted-fg">{question}</span>
            )}

            {isButton ? (
                <Link to={to}>
                    <Button size="lg">{linkText}</Button>
                </Link>
            ) : (
                <Link className="text-sm underline hover:opacity-80" to={to}>
                    {linkText}
                </Link>
            )}
        </div>
    );
};
