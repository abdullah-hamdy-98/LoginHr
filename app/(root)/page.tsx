import Charts from "@/components/charts/DashBoard";

export default async function Home() {

  // Set Delay 10s for (show Loader)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      <Charts />
    </>
  );
}
