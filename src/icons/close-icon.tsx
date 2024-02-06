import * as React from "react";

export const CloseIcon = ({
  ...rest
}: React.SVGAttributes<HTMLElement & SVGElement>) => {
  const { className: restClass, ...restWithoutClass } = rest;

  return (
    // @ts-expect-error I'm not sure what the issue is here
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 cursor-pointer hover:outline rounded outline-offset-2 outline-1 ${restClass}`}
      {...restWithoutClass}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
