import * as React from "react";
const RotationLine = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={740.236}
    height={206.183}
    {...props}
  >
    <g fillOpacity={0.5} strokeLinecap="round" strokeOpacity={0.3}>
      <path
        fill="none"
        stroke="var(--foreground)"
        strokeDasharray="24 12"
        strokeWidth={5}
        d="M633.256 10.802c14.8 15.9 130.24 66.03 87.57 96.92-42.67 30.9-226.7 88.18-343.58 88.46-116.87.28-313.6-55.74-357.67-86.77-44.06-31.03 77.26-83.23 93.29-99.41"
      />
      <path
        fill="none"
        stroke="var(--foreground)"
        strokeWidth={5}
        d="M95.986 30.912c5.86-5.09 7.97-10.82 16.05-21.4M86.776 16.512c8.1-1.5 12.5-3.66 25.26-7"
      />
    </g>
  </svg>
);
export default RotationLine;
