import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={670}
      height={97}
      viewBox="0 0 670 97"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"Page 1"}</title>
      <defs>
        <linearGradient
          x1="100%"
          y1="4.563%"
          x2="100%"
          y2="31.967%"
          id="prefix__linearGradient-1"
        >
          <stop stopColor="#A741A1" offset="0%" />
          <stop stopColor="#6C2291" offset="41.126%" />
          <stop stopColor="#3F0B7D" offset="64.526%" />
          <stop offset="100%" />
        </linearGradient>
        <style>
          {
            "@font-face{@import url(//hello.myfonts.net/count/3ee94f);@font-face{font-family:&quot;KapraNeue-BlackExpanded&quot;;src:local(&apos;\u263A&apos;),url(/KapraNeue/webFonts/KapraNeueBlackExpanded/font.woff) format(&apos;woff&apos;)}@font-face{font-family:&quot;Kapra Neue&quot;;src:local(&apos;\u263A&apos;),url(/KapraNeue/webFonts/KapraNeueBlackExpanded/font.woff) format(&apos;woff&apos;)}}"
          }
        </style>
      </defs>
      <g
        id="prefix__Page-1"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g id="prefix__logo" transform="translate(-14 -6)">
          <g id="prefix__L" transform="translate(13.997 11.922)" fill="#0279C0">
            <path
              d="M0 0l24.21 9.778v54.044L72.633 75.2v15.823L0 79.46V0z"
              id="prefix__Path"
            />
          </g>
          <g id="prefix__L" transform="translate(43.314 6.056)" fill="#FE7500">
            <path
              d="M0 0l17.023 9.778v54.044L51.069 75.2v15.823L0 79.46V0z"
              id="prefix__Path"
            />
          </g>
        </g>
        <text
          id="logo-head"
          className="logo-head"
          fontSize={55}
          fontStyle="expanded"
          fontWeight={700}
          fill="#FFF"
          style={{
            textShadow: "9px 5px 8px rgba(0,0,0,.5)",
          }}
        >
          <tspan x={66} y={64}>
            {"LOOKING GLASS ENGINE"}
          </tspan>
        </text>
      </g>
    </svg>
  )
}

export default SvgComponent
