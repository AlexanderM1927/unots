import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix('/notes', [
        route('', './routes/notes._index.tsx'),
        route(':id', './routes/notes.$id.tsx'),
    ]),
] satisfies RouteConfig;
