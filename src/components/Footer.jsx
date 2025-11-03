export default function Footer(){
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4 py-6 text-center">
        © {new Date().getFullYear()} ReactDock — Built with ❤️ by Rohit & team
      </div>
    </footer>
  )
}
