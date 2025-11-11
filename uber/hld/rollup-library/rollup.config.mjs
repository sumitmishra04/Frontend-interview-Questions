import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

const components = ["Button", "Text"];

export default [
    // Build JS for each component
    ...components.map((component) => ({
        input: `src/components/${component}.tsx`,
        output: [
            { file: `dist/${component}.cjs.js`, format: "cjs", sourcemap: false },
            { file: `dist/${component}.esm.js`, format: "esm", sourcemap: false }
        ],
        external: ["react", "react-dom"],
        plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })]
    })),
    // Build JS for index
    {
        input: "src/index.ts",
        output: [
            { file: "dist/index.cjs.js", format: "cjs", sourcemap: false },
            { file: "dist/index.esm.js", format: "esm", sourcemap: false }
        ],
        external: ["react", "react-dom"],
        plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })]
    }
];
