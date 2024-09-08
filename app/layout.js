import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from '../components/ui/toaster';
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div className='sticky top-0'>
          <Header />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
