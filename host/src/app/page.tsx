import RemoteComponent from "@/components/RemoteComponent";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <RemoteComponent
          title="Remote Widget from Host"
          description="This widget can be updated client-side too"
          data={{
            items: [
              { id: 1, name: "Item 1" },
              { id: 2, name: "Item 2" },
              { id: 3, name: "Item 3" },
              { id: 4, name: "Item 4" },
            ],
          }}
        />
      </div>
    </main>
  );
}
