"use client";

interface HexaProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function Hexa({
  className = "",
  width = "823.6679867165121",
  height = "673.6317334768689",
}: HexaProps) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 823.6679867165121 673.6317334768689"
      width={width}
      height={height}
      className={className}
    >
      <style>{`
        @font-face {
          font-family: Excalifont;
          src: url(data:font/woff2;base64,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);
        }
      `}</style>

      {/* Hexagon lines */}
      <g strokeLinecap="round">
        {/* Top-left line */}
        <g transform="translate(398.25284967183234 85.1834175285559) rotate(0 -106.36419166515816 70.6368858167776)">
          <path
            d="M-0.88 1.76 C-83.1 56.28, -172.61 116.11, -211.01 142.39 M-1.06 -1.12 C-48.24 33.86, -97.04 67.65, -211.85 140.91"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Top-left secondary line */}
        <g transform="translate(399.8022073385091 87.57783942856449) rotate(0 -105.48581100625688 71.9242046728074)">
          <path
            d="M0.44 -0.86 C-45.45 31.37, -90.98 68.72, -207.52 144.71 M-0.74 -0.78 C-45.87 27.97, -90.32 57.23, -211.41 143.03"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Bottom-right line */}
        <g transform="translate(608.3923021716173 427.152890428191) rotate(0 -104.76850324342422 70.55291796524637)">
          <path
            d="M2.62 -0.97 C-43.58 29.88, -95.19 64.6, -210.54 141.89 M0.79 1.56 C-52.7 37.33, -100.84 67.51, -212.15 142.08"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Right-top line */}
        <g transform="translate(605.152816038275 226.16837369507417) rotate(0 -103.65662193139315 -71.00378685766012)">
          <path
            d="M0.43 -1.48 C-78.85 -59, -163.91 -114.37, -204.7 -140.04 M0.42 -1.18 C-80.06 -53.79, -159.97 -108.14, -207.74 -140.83"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Right-top secondary line */}
        <g transform="translate(607.5472379382836 231.94305252841227) rotate(0 -104.02327460942843 -70.50332006598683)">
          <path
            d="M-1.22 1.78 C-40.84 -31.4, -89.06 -56.11, -206.51 -142.78 M0.64 1.46 C-53.56 -38.61, -106.35 -75.05, -208.69 -141.6"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Bottom-left line */}
        <g transform="translate(396.9854730385332 565.602653894712) rotate(0 -104.73956972093356 -69.77577914038977)">
          <path
            d="M0.03 -3.11 C-64.37 -46.52, -125.3 -90.76, -210.42 -141.11 M0.94 1.56 C-42.19 -28.7, -84.93 -56.14, -208.43 -140.49"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Bottom-left secondary line */}
        <g transform="translate(392.43611537185734 569.4335531613654) rotate(0 -102.66690945025312 -71.08261012535024)">
          <path
            d="M2.34 2.39 C-55.72 -45.31, -118.02 -85.86, -204.73 -144.56 M0.2 -0.64 C-80.49 -56.59, -160.22 -109.44, -207.67 -143.06"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Bottom-right secondary line */}
        <g transform="translate(606.8429445049396 430.6739181615088) rotate(0 -106.43651562637524 70.77396713545738)">
          <path
            d="M0.93 -2.18 C-68.53 44.83, -129.28 92.36, -213.81 143.72 M-1.24 0.5 C-47.38 37.29, -97.97 69.67, -209.18 143.71"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Left vertical line */}
        <g transform="translate(189.49523084158864 227.3730419528175) rotate(0 -0.710852287709713 97.22529666007236)">
          <path
            d="M-3.94 -2.74 C2.58 76.26, -3.91 145.14, 2.52 195.09 M2 -1.82 C0.35 69.03, 0.39 135.38, -0.85 197.19"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Left vertical secondary line */}
        <g transform="translate(192.73471697492914 232.30265655282332) rotate(0 0.33714805938188874 98.2458312406458)">
          <path
            d="M-1.16 3.31 C-0.37 70.4, 5.57 137.73, 0.72 193.16 M0.23 0.41 C0 77.06, -0.58 152.57, -1.93 196.08"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Right vertical line */}
        <g transform="translate(606.8161913077938 228.9223996194938) rotate(0 1.5723617219637163 95.81652593866662)">
          <path
            d="M2.92 -2.02 C3.54 69.54, 6.31 130.22, 3.13 192.29 M0.59 -0.67 C-2.1 42.08, -2.3 81.77, 0.72 193.65"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Right vertical secondary line */}
        <g transform="translate(604.1402278078085 233.0069499861672) rotate(0 1.2048663345804016 98.79845010184422)">
          <path
            d="M1.86 3.12 C4.16 66.84, 3.96 130.91, 3.28 191.65 M-1.33 1.99 C0.53 43.51, 3.81 90.18, 0.81 195.61"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Decorative lines (semi-transparent) - Top-left to center */}
        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(398.83843534307834 310.8762505379957) rotate(0 100.66792680184608 58.41760259476632)"
        >
          <path
            d="M-1.8 -2.16 C32.14 17.57, 168.79 99.2, 203.13 118.99 M2.42 2.84 C35.98 21.8, 167.22 95.97, 200.61 115.48"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Additional decorative paths */}
        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(403.0430157446117 311.01676464445495) rotate(0 101.57854851897173 58.04939061460229)"
        >
          <path
            d="M2.05 -1.54 C35.53 17.84, 169.65 97.8, 203.44 117.63 M-0.29 3.8 C32.57 22.22, 167.1 95.24, 201.08 113.38"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(192.64603679350603 428.2237872441873) rotate(0 104.29752617024997 -59.94896960356914)"
        >
          <path
            d="M0.83 0.76 C36.12 -18.44, 175.38 -96.52, 210.76 -116.72 M-2.16 -1.29 C32.85 -21.13, 172.79 -101.16, 208.59 -120.66"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(198.0838056018547 427.8933810179292) rotate(0 105.10229501390086 -57.446389885933)"
        >
          <path
            d="M2.33 -1.74 C36.98 -21.1, 175.09 -98.86, 210.05 -118.38 M0.16 3.49 C34.19 -15.16, 172.34 -94.69, 207.49 -114.59"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(394.62612440504836 88.16548410939467) rotate(0 0.2432796498164862 110.82174701743358)"
        >
          <path
            d="M-2.65 2.14 C-2.21 38.89, 1.87 182.27, 3.14 218.69 M1.11 0.83 C1.03 37.98, -0.12 183.73, 0.27 220.81"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(395.64336005286077 86.33790546406479) rotate(0 3.271982853017562 111.27099512540335)"
        >
          <path
            d="M2.25 -1.51 C2.18 36.08, 1.58 186.89, 1.58 224.05 M0.03 3.84 C0.6 40.84, 5.19 183.65, 6.52 220.45"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Arrow elements */}
        <g transform="translate(123.23860726653857 185.76141534398798) rotate(0 20.66077928015875 16.778734695831645)">
          <path
            d="M-0.9 -0.89 C0.75 3.45, 2.25 21.35, 9.44 27.06 C16.63 32.77, 36.7 32.21, 42.22 33.36 M0.83 1.26 C2.44 5.65, 2.17 22.63, 9.01 28.17 C15.86 33.7, 36.75 33.28, 41.88 34.45"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M24.41 39.92 C28.73 38.72, 33.53 38.18, 42.14 34.49 M26.16 39.01 C32.49 36.27, 38.83 34.99, 41.92 34.79"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M25.57 28.53 C29.68 30.32, 34.18 32.76, 42.14 34.49 M27.33 27.61 C33.23 29.32, 39.12 32.48, 41.92 34.79"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Right arrow */}
        <g transform="translate(685.9106158659115 224.49359927728878) rotate(0 -32.90883812105312 -4.236919544404088)">
          <path
            d="M-0.01 -0.69 C-4.57 -1.99, -17.01 -8.86, -27.64 -9.11 C-38.27 -9.36, -58.25 -3.41, -63.78 -2.19 M-3.47 -3.54 C-8.12 -4.3, -17.98 -6.54, -28.37 -5.84 C-38.76 -5.14, -59.28 -0.45, -65.8 0.64"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-51.8 -6.35 C-56 -5.75, -60.09 -1.46, -65.87 0.74 M-52.2 -8.74 C-56.72 -4.48, -62.2 -0.67, -66.13 1.24"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-49.6 4.94 C-54.39 2.27, -59.11 3.29, -65.87 0.74 M-50 2.55 C-55.46 2.51, -61.78 1.99, -66.13 1.24"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Bottom arrow */}
        <g transform="translate(400.05358383290695 615.3922473435283) rotate(0 -6.4799598308541135 -16.498311242730153)">
          <path
            d="M0.63 0 C-1.62 -1.93, -12.57 -5.89, -13.22 -11.09 C-13.87 -16.28, -4.83 -27.54, -3.26 -31.16 M-0.5 -1.04 C-2.83 -2.83, -13.07 -4.28, -13.57 -9.6 C-14.07 -14.93, -5.22 -29.26, -3.52 -33"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-5.12 -20.28 C-4.76 -24.2, -3.21 -28.47, -4.2 -34.09 M-4.62 -21.96 C-4.43 -24.3, -3.92 -27.5, -3.78 -32.69"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-12.21 -24.03 C-9.54 -26.78, -5.7 -29.84, -4.2 -34.09 M-11.71 -25.72 C-9.72 -27.15, -7.42 -29.4, -3.78 -32.69"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Additional decorative paths */}
        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(96.19655179990241 326.8871423104946) rotate(0 -0.21797463284519836 55.653474720966585)"
        >
          <path
            d="M-2.3 -2.66 C-1.54 16, 1.01 91.95, 1.87 111.06 M1.64 2.06 C2.22 21.17, -0.66 95.16, -0.74 113.97"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(105.49225836655842 456.1819700103481) rotate(0 65.05924076951351 48.23964314882579)"
        >
          <path
            d="M2.43 1.48 C23.54 17.41, 104.1 78.29, 124.3 94.5 M0.3 -0.19 C22.54 16.09, 108.34 80.96, 129.82 96.67"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(411.40551083287755 27.73440371083359) rotate(0 82.58092723233676 53.24417505141845)"
        >
          <path
            d="M-1.11 -1.16 C26.53 17.56, 138.56 92.12, 166.27 110.75 M3.49 -4.26 C30.92 13.72, 138.54 86.49, 165.29 106.22"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(385.208519599576 29.424532177498435) rotate(0 -74.95709247243485 50.21323811250974)"
        >
          <path
            d="M-1.74 0.53 C-26.83 17.83, -124.97 85.21, -149.97 102.08 M2.51 -1.65 C-23.04 15.06, -127.66 81.86, -152.42 98.35"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(691.9668362992279 324.3519496104975) rotate(0 -0.7613969587896463 54.83453755046105)"
        >
          <path
            d="M1.77 -0.88 C1.17 18, -2.91 94.55, -3.5 113.49 M-0.71 -3.82 C-0.43 14.17, 2.41 89.1, 1.92 109.08"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(557.6016231993799 567.7304488102217) rotate(0 59.66106305741596 -56.67488248194434)"
        >
          <path
            d="M0.06 -2.23 C20.18 -20.38, 101.89 -92.94, 122.68 -111.54 M-3.36 2.74 C16.15 -16.06, 98.87 -97.04, 120.06 -116.09"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(78.45020289992317 395.33734521041697) rotate(0 0.19569736595485665 23.164607305508014)"
        >
          <path
            d="M-0.72 0.53 C-0.52 8.22, 0.63 37.73, 0.85 44.94 M1.11 -0.23 C1.17 7.77, 0.14 39.09, -0.1 46.56"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(424.0814743328647 13.368311744183302) rotate(0 34.964289525636104 21.658740168468157)"
        >
          <path
            d="M0.2 -0.58 C12.5 7, 60.84 36.5, 73.06 44.56 M-3.13 -3.37 C8.74 4.53, 57.72 37.6, 70.11 46.69"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(702.1076070992158 372.5206109104429) rotate(0 -0.2343632980619077 30.633060690638672)"
        >
          <path
            d="M0.4 2.17 C-0.37 11.5, -2.65 47.86, -2.61 57.9 M-2.83 0.88 C-2.95 10.33, 2.04 50.84, 2.37 60.39"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(15.915449633326716 181.53609417732608) rotate(0 45.58761235152588 -1.6584528177838251)"
        >
          <path
            d="M2.53 -1.18 C17.55 -1.74, 76.01 -2.3, 90.72 -2.61 M0.45 -4.29 C15.23 -4.44, 74.62 0.29, 89.56 0.98"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(705.4878640325451 221.25411314394776) rotate(0 52.05985292155947 -0.10394529329718694)"
        >
          <path
            d="M-0.84 0.19 C16.64 0.36, 87.35 1.85, 104.96 2.18 M3.91 -2.17 C20.95 -2.87, 85.92 -1.65, 102.35 -1.65"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(338.72998676629413 659.8424502434506) rotate(0 67.42004554610457 -1.8908939044206932)"
        >
          <path
            d="M-2.13 -1.07 C20.42 -0.84, 113.99 0.82, 136.97 0.57 M1.9 -4.12 C24.09 -4.64, 113.64 -4.29, 135.69 -3.68"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Complex decorative paths - note: simplified from original */}
        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(395.2467831938375 108.75859322437853) rotate(0 105.35393916969997 151.68080107140344)"
        >
          <path
            d="M-1.82 -0.75 C1.33 -2.08, 19.28 -11.96, 19.01 -8.67 C18.73 -5.39, -4.8 16.99, -3.46 18.96 C-2.13 20.92, 25.99 -2.2, 27.01 3.13 C28.04 8.45, -0.02 49.44, 2.71 50.89 C5.44 52.34, 43.63 4.31, 43.37 11.82 C43.12 19.33, -3.64 92.46, 1.17 95.94 C5.99 99.42, 71.92 25.59, 72.27 32.69 C72.63 39.78, -1.9 134.14, 3.3 138.52 C8.5 142.9, 103.07 50.47, 103.47 58.98 C103.86 67.49, -1.82 185.59, 5.67 189.58 C13.16 193.56, 141.05 77.06, 148.4 82.89 C155.75 88.72, 40.64 218.17, 49.76 224.56 C58.88 230.94, 194.35 116.6, 203.14 121.2 C211.93 125.8, 101.77 241.15, 102.5 252.15 C103.23 263.15, 201.33 182.97, 207.52 187.2 C213.71 191.42, 139.12 269.09, 139.65 277.51 C140.17 285.92, 206.42 235.06, 210.66 237.68 C214.9 240.3, 165.18 288.78, 165.07 293.22 C164.96 297.66, 206.26 263.47, 209.99 264.32 C213.73 265.17, 186.91 294.77, 187.48 298.32 C188.05 301.87, 211.56 282.96, 213.39 285.61 C215.23 288.26, 199.07 309.4, 198.5 314.2 C197.93 319.01, 207.99 315.15, 209.95 314.45"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g
          strokeOpacity="0.2"
          fillOpacity="0.2"
          transform="translate(377.76886912875034 95.1588923329185) rotate(0 111.38992639819025 151.25038227506124)"
        >
          <path
            d="M-1.72 0.98 C1.71 -1.4, 15.06 -16.34, 18.29 -12.92 C21.53 -9.5, 16.03 19.2, 17.68 21.5 C19.33 23.8, 27.88 -2.88, 28.2 0.87 C28.53 4.62, 17.38 41.99, 19.63 43.99 C21.89 45.99, 41.98 6.02, 41.74 12.87 C41.5 19.73, 13.12 81.57, 18.19 85.12 C23.26 88.68, 71.74 27.58, 72.14 34.22 C72.55 40.85, 15.25 121.14, 20.6 124.91 C25.95 128.67, 103.91 49.46, 104.24 56.8 C104.56 64.14, 15.36 164.2, 22.54 168.97 C29.72 173.75, 143.49 76.35, 147.31 85.45 C151.13 94.55, 38.05 219.1, 45.46 223.55 C52.88 228, 183.99 107.94, 191.82 112.12 C199.66 116.31, 87.34 238.32, 92.46 248.68 C97.58 259.04, 214.42 169.09, 222.53 174.29 C230.63 179.48, 142.58 270.11, 141.1 279.87 C139.62 289.62, 210.06 230.96, 213.62 232.83 C217.18 234.69, 162.7 286.19, 162.46 291.06 C162.23 295.93, 208.74 260.59, 212.24 262.07 C215.74 263.54, 182.93 296.61, 183.46 299.93 C184 303.26, 213.06 279.69, 215.44 282.02 C217.83 284.36, 198.65 308.83, 197.77 313.94 C196.9 319.04, 207.96 312.72, 210.19 312.65"
            stroke="#f6f8ff"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </g>

      {/* Text labels */}
      <g transform="translate(10 134.21249711071303) rotate(0 66.60582958795976 23.485835033320882)">
        <text
          x="0"
          y="33.10563306296912"
          fontFamily="Excalifont, sans-serif"
          fontSize="37.58px"
          fill="#f6f8ff"
          textAnchor="start"
          style={{ whiteSpace: "pre" }}
        >
          STORY
        </text>
      </g>

      <g transform="translate(12.394421900008638 136.60691901072167) rotate(0 66.60582958795976 23.485835033320882)">
        <text
          x="0"
          y="33.10563306296912"
          fontFamily="Excalifont, sans-serif"
          fontSize="37.58px"
          fill="#f6f8ff"
          textAnchor="start"
          style={{ whiteSpace: "pre" }}
        >
          STORY
        </text>
      </g>

      <g transform="translate(689.9951662325848 178.71935987735176) rotate(0 60.21666717529297 23.485835033320882)">
        <text
          x="0"
          y="33.10563306296912"
          fontFamily="Excalifont, sans-serif"
          fontSize="37.58px"
          fill="#f6f8ff"
          textAnchor="start"
          style={{ whiteSpace: "pre" }}
        >
          SPACE
        </text>
      </g>

      <g transform="translate(693.2346523659262 181.11378177736051) rotate(0 60.21666717529297 23.485835033320882)">
        <text
          x="0"
          y="33.10563306296912"
          fontFamily="Excalifont, sans-serif"
          fontSize="37.58px"
          fill="#f6f8ff"
          textAnchor="start"
          style={{ whiteSpace: "pre" }}
        >
          SPACE
        </text>
      </g>

      <g transform="translate(327.09651816634596 615.110705743551) rotate(0 77.57499694824219 23.485835033320882)">
        <text
          x="0"
          y="33.10563306296912"
          fontFamily="Excalifont, sans-serif"
          fontSize="37.58px"
          fill="#f6f8ff"
          textAnchor="start"
          style={{ whiteSpace: "pre" }}
        >
          SYSTEM
        </text>
      </g>

      <g transform="translate(331.18106853301924 616.6600634102272) rotate(0 77.57499694824219 23.485835033320882)">
        <text
          x="0"
          y="33.10563306296912"
          fontFamily="Excalifont, sans-serif"
          fontSize="37.58px"
          fill="#f6f8ff"
          textAnchor="start"
          style={{ whiteSpace: "pre" }}
        >
          SYSTEM
        </text>
      </g>
    </svg>
  );
}
