import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig ={
  transpilePackages: ['next-mdx-remote'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

  
const withMDX = createMDX({

})
 
// Combine MDX and Next.js config
export default withMDX(nextConfig)