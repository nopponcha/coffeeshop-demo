import { ContactForm } from "@/components/ContactForm";
import { SiteHeader } from "@/components/SiteHeader";
import { formatHoursRange, SHOP_ADDRESS, weeklyHours } from "@/data/hours";
import { formatPrice, menuCategories } from "@/data/menu";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <header className="hero">
          <h1>Bean &amp; Brew</h1>
          <p>
            Welcome to our cozy corner of Bangkok. We roast small batches, bake
            fresh pastries daily, and pour every cup with care. Scroll down for
            our menu, hours, and a way to say hello.
          </p>
        </header>

        <section id="menu" aria-labelledby="menu-heading">
          <h2 id="menu-heading">Menu</h2>
          {menuCategories.map((category) => (
            <div className="menu-category" key={category.id}>
              <h3>{category.title}</h3>
              <ul className="menu-list">
                {category.items.map((item) => (
                  <li className="menu-item" key={item.name}>
                    <span className="menu-item__name">{item.name}</span>
                    <span className="menu-item__price">
                      {formatPrice(item.priceBaht)}
                    </span>
                    <p className="menu-item__desc">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="hours" aria-labelledby="hours-heading">
          <h2 id="hours-heading">Hours</h2>
          <table className="hours-table">
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Hours</th>
              </tr>
            </thead>
            <tbody>
              {weeklyHours.map((row) => (
                <tr key={row.day}>
                  <td>{row.day}</td>
                  <td>{formatHoursRange(row.open, row.close)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <address className="address">{SHOP_ADDRESS}</address>
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>
          <ContactForm />
        </section>
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Bean &amp; Brew</p>
      </footer>
    </>
  );
}
