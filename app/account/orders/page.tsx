import OrdersClient from "./orders-client"

interface SearchParams {
  search?: string
  status?: string
}

export default function OrdersPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <OrdersClient 
      initialSearch={searchParams.search || ""}
      initialStatus={searchParams.status || "all"}
    />
  )
} 