import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-column">
          <h4>Support</h4>
          <a href="#">Help Centre</a>
          <a href="#">Safety information</a>
          <a href="#">Cancellation options</a>
          <a href="#">Report a problem</a>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h4>Hosting</h4>
          <a href="/create-listing">Try hosting</a>
          <a href="#">AirCover for Hosts</a>
          <a href="#">Hosting resources</a>
          <a href="#">Community forum</a>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h4>Airbnb</h4>
          <a href="#">Newsroom</a>
          <a href="#">New features</a>
          <a href="#">Careers</a>
          <a href="#">Investors</a>
        </div>

        {/* Column 4 */}
        <div className="footer-column">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
          <a href="#">Cookie Policy</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Your App Clone. Built with React.</p>
      </div>
    </footer>
  );
}

export default Footer;