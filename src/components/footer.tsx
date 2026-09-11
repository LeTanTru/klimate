const Footer = () => {
  return (
    <footer className='border-t py-12 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto px-4 text-center text-gray-400'>
        <p>&copy; {new Date().getFullYear()} Le Tan Tru. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default Footer
