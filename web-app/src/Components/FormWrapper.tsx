import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-700 sm:text-3xl p-10">
          {title}
        </h2>

        <div
          style={{
            display: "grid",
            gap: "1rem .5rem",
            gridTemplateColumns: "auto minmax(auto, 400px)",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
