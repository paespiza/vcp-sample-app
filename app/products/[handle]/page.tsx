import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  return { title: "Product Page" };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  return (
    <>
      <div>Product Page: {params.handle}</div>
    </>
  );
}