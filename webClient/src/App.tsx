import { useHealthCheck } from "./api/useHealthCheck";

import "./App.css";

const App = () => {
    const { data, isLoading, error } = useHealthCheck();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return <div>{data}</div>;
};

export default App;
