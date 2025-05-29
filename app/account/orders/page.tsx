import React, { Suspense } from 'react';
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
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersClient 
        initialSearch={searchParams.search || ""}
        initialStatus={searchParams.status || "all"}
      />
    </Suspense>
  )
}