import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <Image
          src="https://babynama.com/_next/static/media/logo-light.f8d530c6.svg"
          alt="Babynama Logo"
          width={150}
          height={35}
          priority
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to the Babynama Intern Assignment
        </h1>
        <p className="text-lg text-gray-600">
          Your task is to build the feature at the <code>/webinars</code> page.
        </p>
        <p className="mt-4 text-gray-500">Good luck!</p>
      </div>
    </main>
  );
}
