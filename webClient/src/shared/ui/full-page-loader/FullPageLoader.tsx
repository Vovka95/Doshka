import { Spinner } from "../spinner";

export const FullPageLoader = () => {
    return (
        <div className="min-h-screen bg-bg text-fg">
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-muted-fg">
                    <Spinner />
                </div>
            </div>
        </div>
    );
};
