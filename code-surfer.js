import React from 'react'
import { CodeSurfer } from "mdx-deck-code-surfer"
// import vsDarkPlus from "prism-react-renderer/themes/vsDarkPlus"

const CustomCodeSurfer = ({ title, code, steps }) => (
  <CodeSurfer
    title={title}
    code={code}
    lang="javascript"
    showNumbers={false}
    // theme={vsDarkPlus}
    steps={steps}
  />
)

export default CustomCodeSurfer
