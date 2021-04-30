export default function PageTitle({ children }) {
  return (
    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
      {children}
    </h1>
  );
}
