import React, {useState}  from "react"
import { useRouter } from 'next/router'

function SvgComponent(props) {

  const router = useRouter();
  const [showHover, setShowHover] = useState(false);

  function doClick() {
    if (props.href) {
      router.push(props.href);
    }
  }
  return (
    <svg width={106} height={42} viewBox="0 0 106 42" {...props} onClick={doClick}>
      <defs>
        <filter
          x="-34.1%"
          y="-75%"
          width="168.2%"
          height="250%"
          filterUnits="objectBoundingBox"
          id="prefix__a"
        >
          <feGaussianBlur stdDeviation={5} in="SourceGraphic" />
        </filter>
        <filter
          x="-23.7%"
          y="-78.3%"
          width="147.4%"
          height="256.5%"
          filterUnits="objectBoundingBox"
          id="prefix__c"
        >
          <feGaussianBlur stdDeviation={6} in="SourceGraphic" />
        </filter>
        <linearGradient
          x1="14.19%"
          y1="50.545%"
          x2="85.891%"
          y2="50.545%"
          id="prefix__b"
        >
          <stop stopColor="#F1F1F1" stopOpacity={0} offset="0%" />
          <stop stopColor="#DEDEDE" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        {showHover ?  <ellipse
          fill="#99F"
          filter="url(#prefix__a)"
          cx={69}
          cy={21}
          rx={22}
          ry={10}
        /> : ''}
        <ellipse
          fill="url(#prefix__b)"
          filter="url(#prefix__c)"
          cx={48}
          cy={20.5}
          rx={38}
          ry={11.5}
        />
        <path fill={showHover ? '#000099' : 'black'} d="M92.7 20.7l-29.4 14v-28z"
        onMouseOver={() => setShowHover(true)} onMouseOut={() => setShowHover(false)}
        />
      </g>
    </svg>
  )
}

export default SvgComponent
