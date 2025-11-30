import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";

export const useHealthCheck = () => {
    return useQuery({
        queryKey: ["health"],
        queryFn: async () => {
            const res = await api.get("/api/health");
            return res.data;
        },
    });
};
