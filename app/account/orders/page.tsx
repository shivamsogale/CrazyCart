import React, { Suspense } from 'react';
import OrdersClient from "./orders-client";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersClient />
    </Suspense>
  );
}