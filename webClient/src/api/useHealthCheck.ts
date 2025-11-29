import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";

export const useHealthCheck = () => {
    return useQuery({
        queryKey: ["health"],
        queryFn: async () => {
            const res = await api.get("/health");
            return res.data;
        },
    });
};
