import { Link } from "react-router-dom";

export type AuthRedirectProps = {
    question?: string;
    linkText: string;
    to: string;
};

export const AuthRedirect = ({ question, linkText, to }: AuthRedirectProps) => {
    return (
        <div className="flex gap-2 justify-items-start">
            {question && (
                <span className="text-sm text-muted-fg">{question}</span>
            )}
            <Link className="text-sm underline hover:opacity-80" to={to}>
                {linkText}
            </Link>
        </div>
    );
};
