import { NextResponse } from "next/server"

const backendUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "")

async function proxyBackendRequest(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const target = new URL(`${backendUrl}/${path.map(encodeURIComponent).join("/")}`)
  target.search = new URL(request.url).search

  const headers = new Headers()
  for (const headerName of ["accept", "content-type", "cookie"]) {
    const value = request.headers.get(headerName)
    if (value) headers.set(headerName, value)
  }

  const method = request.method.toUpperCase()
  const body = method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer()
  const upstream = await fetch(target, {
    method,
    headers,
    body,
    cache: "no-store",
    redirect: "manual",
  })

  const responseHeaders = new Headers()
  for (const headerName of ["content-type", "cache-control", "content-disposition"]) {
    const value = upstream.headers.get(headerName)
    if (value) responseHeaders.set(headerName, value)
  }

  return new NextResponse(upstream.body, { status: upstream.status, headers: responseHeaders })
}

export const GET = proxyBackendRequest
export const POST = proxyBackendRequest
export const PATCH = proxyBackendRequest
export const DELETE = proxyBackendRequest
