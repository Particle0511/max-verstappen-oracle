import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Max Verstappen Oracle</title>
        <meta name="description" content="The ultimate F1 command center for Max Verstappen fans." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-oracle-blue">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-oracle-lightgray">
            Max Verstappen <span className="text-oracle-red">Oracle</span>
          </h1>
          <p className="mt-4 text-2xl text-oracle-gray">
            The Ultimate F1 Command Center. Coming Soon.
          </p>
        </div>
      </main>
    </>
  )
}
